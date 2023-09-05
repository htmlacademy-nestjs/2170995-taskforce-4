import { Injectable } from '@nestjs/common';
import { TaskTagRepository } from './taks-tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TaskTagEntity } from './task-tag.entity';
import { Tag } from '@project/shared/app-types';

@Injectable()
export class TaskTagService {
  constructor(private readonly taskTagRepository: TaskTagRepository) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const tagEntity = new TaskTagEntity(dto);
    return this.taskTagRepository.create(tagEntity);
  }

  async deleteTag(id: number): Promise<void> {
    await this.taskTagRepository.destroy(id);
  }

  async getTag(id: number): Promise<Tag | null> {
    return this.taskTagRepository.findById(id);
  }

  async findByName(text: string): Promise<Tag | null> {
    return this.taskTagRepository.findByName(text);
  }

  async findOrCreate(text: string): Promise<Tag> {
    return this.taskTagRepository.findOrCreate(text);
  }

  async findOrCreateMany(texts: string[]): Promise<Tag[]> {
    return this.taskTagRepository.findOrCreateMany(texts);
  }

  async getTags(): Promise<Tag[]> {
    return this.taskTagRepository.find();
  }
}
