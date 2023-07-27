import { TaskService } from './task.service';
import { TaskMemoryRepository } from './task-memory.repository';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskMemoryRepository, TaskService],
})
export class TaskModule {}
