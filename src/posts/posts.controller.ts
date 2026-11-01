import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from '../auth/decorator/active-user.decorator';
import { type ActiveUserInterface } from '../auth/interfaces/active-user.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:userId}')
  public getPosts(
    @Query() postQuery: GetPostsDto,
    @Param('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ) {
    return this.postsService.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Creates A New Blog',
  })
  @ApiResponse({
    status: 201,
    description: 'You Get A 201 Response If Ur Post Created Successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.postsService.createPost(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Update A Blog Post',
  })
  @ApiResponse({
    status: 200,
    description: 'You Get A 200 Response If Ur Post Update Successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.updatePost(patchPostDto);
  }

  @ApiOperation({
    summary: 'Delete A Blog Post By Id',
  })
  @ApiResponse({
    status: 200,
    description: 'You Get A 200 Response If The Post Delete Successfully',
  })
  @Delete('/:postId')
  public deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.deletePost(postId);
  }
}
