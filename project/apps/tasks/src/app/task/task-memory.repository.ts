import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Task } from '@project/shared/app-types';
import { TaskEntity } from './task.entity';
import { CRUDRepository } from '@project/util/util-types';

@Injectable()
export class TaskMemoryRepository implements CRUDRepository<TaskEntity, string, Task> {
  private repository: Record<string, Task> = {};

  public async create(item: TaskEntity): Promise<Task> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<Task> {
    if(this.repository[id]) {
      return { ...this.repository[id]};
    }

    return null;
  }

  public async update(id: string, item: TaskEntity): Promise<Task> {
    this.repository[id] = { ...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}