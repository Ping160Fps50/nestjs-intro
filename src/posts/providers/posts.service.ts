import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationService } from '../../common/pagination/providers/pagination.service';
import { Paginated } from '../../common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserInterface } from '../../auth/interfaces/active-user.interface';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Inject userService
     */
    private readonly userService: UsersService,
    /**
     * Inject tagsService
     */
    private readonly tagsService: TagsService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    /**
     * Inject PaginationService
     */
    private readonly paginationService: PaginationService,

    /**
     * Inject createPostProvider
     */
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Create New Post
   */
  public async createPost(
    createPostDto: CreatePostDto,
    user: ActiveUserInterface,
  ) {
    return await this.createPostProvider.createPost(createPostDto, user);
  }

  public async findAll(
    postQuery: GetPostsDto,
    userId: number | undefined,
  ): Promise<Paginated<Post>> {
    const relations = {
      metaOptions: true,
      author: true,
      tags: true,
    };

    const posts = await this.paginationService.paginateQuery<Post>(
      postQuery,
      this.postsRepository,
      relations,
    );

    return posts;
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;

    try {
      //Find Tags
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable To Process Your Request At The Moment Please Try Again.',
        {
          description: 'Error Connecting To The Database',
        },
      );
    }

    if (!tags || tags.length !== patchPostDto.tags?.length) {
      throw new BadRequestException(
        'Please Check Your Tag Ids And Ensure They Are Correct',
      );
    }
    //Find Post
    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable To Process Your Request At The Moment Please Try Again.',
        {
          description: 'Error Connecting To The Database',
        },
      );
    }

    if (!post) {
      throw new BadRequestException('The Post Id Does Not Exist');
    }

    //Update Properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    //Assign New Tags
    post.tags = tags;

    //Save To DataBase
    try {
      await this.postsRepository.save(post);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable To Process Your Request At The Moment Please Try Again.',
        {
          description: 'Error Connecting To The Database',
        },
      );
    }

    return post;
  }

  public async deletePost(postId: number) {
    //Delete Post And MetaOptions With Help Of Cascade
    await this.postsRepository.delete(postId);

    //confirmation
    return { deleted: true, id: postId };
  }
}
