import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@project/shared/app-types';
import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';


@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
        },
        categories: {
          connect: entityData.categories
            .map(({ categoryId }) => ({ categoryId }))
        },
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({  tagId }))
        },
        responses: {
          connect: []
        }
      },
      include: {
        comments: true,
        categories: true,
        tags: true,
        responses: true,
      }
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        comments: true,
        categories: true,
        tags: true,
        responses: true,
      }
    });
  }

  public async find(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        comments: true,
        categories: true,
        tags: true,
        responses: true,
      }
    });
  }

  public update(_id: number, _item: TaskEntity): Promise<Task> {
    return Promise.resolve(undefined);
  }
}