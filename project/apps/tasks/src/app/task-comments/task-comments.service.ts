import { TaskService } from './../task/task.service';
import { TaskCommentEntity } from './task-comments.entiti';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TaskCommentRepository } from './task-comments.repository';
import { Injectable } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';
import dayjs from 'dayjs';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly taskService: TaskService,
  ) {}

  public async create(dto: CreateCommentDto) {
    const { text, userId, taskId } = dto;
    const newComment = { text, userId, taskId, createdAt: dayjs().toDate() };
    const commentEntity = new TaskCommentEntity(newComment);
    await this.taskService.incrementCommentsCounter(taskId, +1);

    return this.taskCommentRepository.create(commentEntity);
  }

  public async getComment(id: number) {
    return this.taskCommentRepository.findById(id);
  }

  public async getComments(id: number) {
    return this.taskCommentRepository.findById(id);
  }

  public async findCommentsByTaskId(taskId: number): Promise<Comment[]> {
    return this.taskCommentRepository.findByTaskId(taskId);
  }

  public async deleteComment(id: number): Promise<void> {
    const comment = await this.taskCommentRepository.findById(id);
    const taskId = comment.taskId;

    await this.taskCommentRepository.destroy(id);
    await this.taskService.incrementCommentsCounter(taskId, -1);
  }
}
