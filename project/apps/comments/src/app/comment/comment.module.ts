import { CommentMemoryRepository } from './comment-memory.repository';
import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentMemoryRepository],
})
export class CommentModule {}
