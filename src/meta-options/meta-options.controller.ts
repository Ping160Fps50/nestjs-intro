import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options-dto';

@Controller('meta-options')
export class MetaOptionsController {
  /**
   * Inject MetaOptionsService
   */
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public createMetaOptions(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaOptionsService.createMetaOption(createPostMetaOptionsDto);
  }
}
