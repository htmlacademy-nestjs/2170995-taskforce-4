import { PrismaModule } from './../prisma/prisma.module';
import { TaskCategoryRepository } from './task-category.repository';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';
import { Module } from '@nestjs/common';


@Module({
  imports: [PrismaModule],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, TaskCategoryRepository],
  exports: [TaskCategoryRepository, TaskCategoryService],
})
export class TaskCategoryModule {}
