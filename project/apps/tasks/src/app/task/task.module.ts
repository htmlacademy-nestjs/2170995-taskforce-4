import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [TaskCategoryModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
