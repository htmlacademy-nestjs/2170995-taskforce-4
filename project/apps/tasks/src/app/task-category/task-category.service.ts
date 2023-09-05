import { TaskCategoryEntity } from './task-category.entity';
import { Category } from '@project/shared/app-types';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TaskCategoryRepository } from './task-category.repository';
import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category,dto';


@Injectable()
export class TaskCategoryService {
  constructor (
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categoryEntity = new TaskCategoryEntity(dto);
    return this.taskCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.taskCategoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Category> {
    return this.taskCategoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return this.taskCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.taskCategoryRepository.update(id, new TaskCategoryEntity(dto));
  }

  async findOrCreateCategory(title: string): Promise<Category> {
    const existCategory = await this.taskCategoryRepository.findByTitle(title);

    if (!existCategory) {
      return this.createCategory({ title });
    }

    return existCategory;
  }
}
