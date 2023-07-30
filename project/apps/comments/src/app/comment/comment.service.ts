import { CommentEntity } from './comment.entity';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentMemoryRepository } from './comment-memory.repository';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentMemoryRepository: CommentMemoryRepository
  ) {}

  public async createComment(dto: CreateCommentDTO) {
    const comment = { ...dto, userId: '', createdAt: dayjs(Date()).toDate()};
    const commentEntity = await new CommentEntity(comment);

    return this.commentMemoryRepository.create(commentEntity)
  }

  public async getComment(id: string) {
    return this.commentMemoryRepository.findById(id);
  }

  public async deleteComment(id: string) {
    return this.commentMemoryRepository.destroy(id);
  }
}
