import { TaskTagService } from './../task-tag/task-tag.service';
import { PrismaService } from '../prisma/prisma.service';
import { Task, TaskStatus } from '@project/shared/app-types';
import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TaskQuery } from './query/task.query';


@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskTagService: TaskTagService,
    ) {}

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return await this.prisma.task.create({
      data: {
        ...entityData,
        comments: {
          connect: []
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
        category: true,
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
        category: true,
        tags: true,
        responses: true,
      }
    });
  }

  public async find(query?: TaskQuery): Promise<Task[]> {
    const {
      limit,
      categories,
      status,
      city,
      tag,
      sortDirection,
      page,
      sortType,
      userId,
      executorId,
    } = query;
    const existingTag = await this.taskTagService.findByName(tag);
    return await this.prisma.task.findMany({
      where: {
        status,
        city,
        userId,
        executorId,
        category: {
          categoryId: {
            in: categories
          }
        },
        tags: { ...(existingTag ? {
          some: { text: existingTag.text }
        } : {})},
      },
      take: limit,

      include: {
        comments: true,
        category: true,
        tags: true,
        responses: true,
      },
      orderBy: [
        { [sortType]: sortDirection  }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(taskId: number, item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();

    return await this.prisma.task.update({
      where: {
        taskId,
      },
      data: {
        ...entityData,
        comments: {
          connect: []
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
        category: true,
        tags: true,
        responses: true,
      }
    })
  }

  public async setAcceptedResponse(taskId: number, executorId: string, price?: number) {
    return this.prisma.task.update({
      where: { taskId },
      data: { executorId, price },
      include: {
        comments: true,
        tags: true,
        responses: true,
      },
    });
  }

  public async findExecutorAtWork(executorId: string) {
    return this.prisma.task.findFirst({
      where: {
        executorId,
        status: TaskStatus.AtWork,
      },
    });
  }

  public async countCustomerTasks({ userId, status }: TaskQuery) {
    return this.prisma.task.count({
      where: {
        AND: [{ userId }, { status }],
      },
    });
  }

  public async countExecutorTasks({ executorId, status }: TaskQuery) {
    return this.prisma.task.count({
      where: {
        AND: [{ executorId }, { status }],
      },
    });
  }

  public async updateCommentsCounter(taskId: number, commentsCount: number) {
    this.prisma.task.update({
      where: { taskId },
      data: { commentsCount },
    });
  }

  public async updateResponsesCounter(taskId: number, responsesCount: number) {
    this.prisma.task.update({
      where: { taskId },
      data: { responsesCount },
    });
  }

  public async updateStatus(taskId: number, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { taskId },
      data: { status },
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true,
      },
    });
  }

  public async addExecutor( taskId: number, executorId: string, price: number): Promise<Task | null> {
    return await this.prisma.task.update({
      where: {
        taskId,
      },
      data: {
        executorId,
        status: TaskStatus.AtWork,
        price,
      },
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true,
      },
    });
  }

  public async addResponse(responseId: number, taskId: number): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        taskId,
      },
      data: {
        responses: {
          connect: [{ responseId }],
        },
      },
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true,
      },
    });
  }
}
