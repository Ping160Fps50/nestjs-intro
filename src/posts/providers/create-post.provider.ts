import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { TagsService } from '../../tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUserInterface } from '../../auth/interfaces/active-user.interface';
import { User } from '../../users/user.entity';
import { Tag } from '../../tags/tag.entity';

@Injectable()
export class CreatePostProvider {
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
  ) {}

  /**
   * Create New Post
   */
  public async createPost(
    createPostDto: CreatePostDto,
    user: ActiveUserInterface,
  ) {
    let author: User;
    let tags: Tag[] | undefined;

    try {
      author = await this.userService.findOneById(user.sub);
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (err) {
      throw new ConflictException(err);
    }

    if (createPostDto.tags?.length !== tags?.length) {
      throw new BadRequestException('Please Check Your TagIds');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (err) {
      throw new ConflictException(err, {
        description: 'Make Sure The Slug Is Unique And Not A Duplicate',
      });
    }
  }
}
