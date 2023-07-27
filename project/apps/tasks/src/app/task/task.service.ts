import { TaskEntity } from './task.entity';
import { TaskStatus } from '@project/shared/app-types';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskMemoryRepository } from './task-memory.repository';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskMemoryRepository: TaskMemoryRepository
  ) {}

  public async createTask(dto: CreateTaskDTO) {
    const task = { ...dto, status: TaskStatus.New, userId: '', createdAt: dayjs(Date()).toDate()};
    const taskEntity = await new TaskEntity(task);

    return this.taskMemoryRepository.create(taskEntity)
  }

  public async getTask(id: string) {
    return this.taskMemoryRepository.findById(id);
  }

  public async deleteTask(id: string) {
    return this.taskMemoryRepository.destroy(id);
  }
}
