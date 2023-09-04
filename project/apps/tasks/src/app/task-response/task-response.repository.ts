import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskResponseEntity } from './task-response.entity';
import { Response } from '@project/shared/app-types';

@Injectable()
export class TaskResponseRepository
  implements CRUDRepository<TaskResponseEntity, number, Response>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskResponseEntity): Promise<Response> {
    return this.prisma.response.create({
      data: {
        offerPrice: item.offerPrice,
        executorId: item.executorId,
        task: { connect: { taskId: item.taskId } },
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.response.delete({
      where: {
        responseId: id,
      },
    });
  }

  public findById(id: number): Promise<Response | null> {
    return this.prisma.response.findFirst({
      where: {
        responseId: id,
      },
    });
  }

  public findByTaskId(taskId: number): Promise<Response[]> {
    return this.prisma.response.findMany({
      where: { taskId },
    });
  }

  public findByUserId(executorId: string): Promise<Response[]> {
    return this.prisma.response.findMany({
      where: { executorId },
    });
  }

  public update(responseId: number, item: TaskResponseEntity): Promise<Response> {
    return this.prisma.response.update({
      where: {
        responseId,
      },
      data: { ...item.toObject(), responseId },
    });
  }
}
