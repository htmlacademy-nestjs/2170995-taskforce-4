import { Injectable } from '@nestjs/common';
import { Response } from '@project/shared/app-types';
import { TaskResponseRepository } from './task-response.repository';
import { TaskResponseEntity } from './task-response.entity';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class TaskResponseService {
  constructor(private readonly taskResponseRepository: TaskResponseRepository) {}

  async create(dto: CreateResponseDto): Promise<Response> {
    const taskResponseEntity = new TaskResponseEntity(dto);
    return this.taskResponseRepository.create(taskResponseEntity);
  }

  async delete(id: number): Promise<void> {
    this.taskResponseRepository.destroy(id);
  }

  async findResponsesByTaskId(id: number): Promise<Response[]> {
    return this.taskResponseRepository.findByTaskId(+id);
  }

  async findResponsesByUserId(id: string): Promise<Response[]> {
    return this.taskResponseRepository.findByUserId(id);
  }
}
