import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { Injectable } from '@nestjs/common';
import { Task } from '@project/shared/app-types';


@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const categories = await this.taskCategoryRepository.find(dto.categories);
    const taskEntity = new TaskEntity({ ...dto, categories, comments: [], tags: [], });
    return this.taskRepository.create(taskEntity);
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async deleteTask(id: number) {
    return this.taskRepository.destroy(id);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async updateTask(_id: number, _dto:UpdateTaskDto): Promise<Task> {
    throw new Error('Not implemented...');
  }
}
