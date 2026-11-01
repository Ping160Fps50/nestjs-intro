import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from '../dtos/create-tags-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject TagsRepository
     */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagsDto: CreateTagsDto) {
    const tag = this.tagRepository.create(createTagsDto);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tagIds: number[] | undefined) {
    if (tagIds) {
      const tags = await this.tagRepository.find({
        where: { id: In(tagIds) },
      });
      return tags;
    }
  }

  public async deleteTag(tagId: number) {
    await this.tagRepository.delete(tagId);

    return {
      deleted: true,
      tagId,
    };
  }

  public async softDeleteTag(tagId: number) {
    await this.tagRepository.softDelete(tagId);

    return {
      deleted: true,
      tagId,
    };
  }
}
