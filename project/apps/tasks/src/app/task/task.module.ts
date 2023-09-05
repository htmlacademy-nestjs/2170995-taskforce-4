import { TaskReviewModule } from './../task-reviews/task-reviews.module';
import { TaskResponseModule } from './../task-response/task-response.module';
import { PrismaModule } from './../prisma/prisma.module';
import { TaskTagsModule } from './../task-tag/task-tag.module';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [
    TaskCategoryModule,
    TaskTagsModule,
    PrismaModule,
    TaskResponseModule,
    TaskReviewModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
