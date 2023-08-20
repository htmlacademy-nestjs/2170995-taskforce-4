import { TaskCategoryRepository } from './task-category.repository';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';
import { Module } from '@nestjs/common';


@Module({
  imports: [],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, TaskCategoryRepository],
  exports: [TaskCategoryRepository]
})
export class TaskCategoryModule {}
