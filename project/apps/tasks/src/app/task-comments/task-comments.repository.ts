import { CommentQuery } from './query/comment.query';
import { PrismaService } from './../prisma/prisma.service';
import { CRUDRepository } from '@project/util/util-types';
import { TaskCommentEntity } from './task-comments.entiti';
import { Injectable } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';

@Injectable()
export class TaskCommentRepository implements CRUDRepository<TaskCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskCommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    await this.prisma.task.update({
      where: {
        taskId: entityData.taskId
      },
      data: {
        commentsCount: { increment: 1 }
      }
    });
    return this.prisma.comment.create({
      data: { ...entityData },
    });
  }

  public async findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId,
      },
    });
  }

  public async update(commentId: number, item: TaskCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId: commentId,
      },
      data: { ...item.toObject(), commentId: commentId },
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

  public find({ limit, page }: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
