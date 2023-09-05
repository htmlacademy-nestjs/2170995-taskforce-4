import { COMMENT_NOT_FOUND } from './task-comment.constants';
import { TaskService } from './../task/task.service';
import { TaskCommentEntity } from './task-comments.entiti';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TaskCommentRepository } from './task-comments.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { CommentQuery } from './query/comment.query';

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

  public async getComments(query: CommentQuery): Promise <Comment[]> {
    return this.taskCommentRepository.find(query);
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

  public async update(commentId: number, dto: CreateCommentDto) {
    const existComment = await this.taskCommentRepository.findById(commentId);
    const newCommentEntity = await new TaskCommentEntity({ ...existComment, ...dto});

    if(!existComment) throw new NotFoundException(COMMENT_NOT_FOUND);

    return await this.taskCommentRepository.update(commentId, newCommentEntity);
  }
}
