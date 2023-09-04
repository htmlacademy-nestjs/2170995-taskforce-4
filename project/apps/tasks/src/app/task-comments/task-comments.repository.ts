import { PrismaService } from './../prisma/prisma.service';
import { CRUDRepository } from '@project/util/util-types';
import { TaskCommentEntity } from './task-comments.entiti';
import { Injectable } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';

@Injectable()
export class TaskCommentRepository implements CRUDRepository<TaskCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskCommentEntity): Promise<Comment> {
    return this.prisma.comment.create({
      data: { ...item.toObject() },
    });
  }

  public async findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId,
      },
    });
  }

  public async update(id: number, item: TaskCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId: id,
      },
      data: { ...item.toObject(), commentId: id },
    });
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      },
    });
  }

  public findByTaskId(taskId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        taskId,
      },
    });
  }

  public find(ids: number[] = []): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        commentId: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }
}
