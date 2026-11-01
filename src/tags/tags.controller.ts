import {
  Body,
  Controller,
  Delete,
  Inject,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTagsDto } from './dtos/create-tags-dto';
import { TagsService } from './providers/tags.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(
    /**
     * Inject tagsService
     */
    private readonly tagsService: TagsService,
  ) {}

  @ApiOperation({
    summary: 'Create Tag',
  })
  @ApiResponse({
    status: 201,
    description: 'Throw Status 201 When New Tag Create Successfully',
  })
  @Post()
  public createTag(@Body() createTagsDto: CreateTagsDto) {
    return this.tagsService.createTag(createTagsDto);
  }

  @ApiOperation({
    summary: 'Delete Tag By Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Throw Status 200 When Tag Delete Successfully',
  })
  @Delete('/:tagId')
  public deleteTag(@Body('tagId', ParseIntPipe) tagId: number) {
    return this.tagsService.deleteTag(tagId);
  }

  @ApiOperation({
    summary: 'Soft Delete Tag By Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Throw Status 200 When Tag Soft Delete Successfully',
  })
  @Delete('soft-delete/:tagId')
  public softDeleteTag(@Body('tagId', ParseIntPipe) tagId: number) {
    return this.tagsService.softDeleteTag(tagId);
  }
}
