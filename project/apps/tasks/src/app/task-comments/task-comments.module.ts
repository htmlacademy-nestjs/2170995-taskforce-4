import { TaskModule } from './../task/task.module';
import { PrismaModule } from './../prisma/prisma.module';
import { TaskCommentRepository } from './task-comments.repository';
import { TaskCommentService } from './task-comments.service';
import { Module } from '@nestjs/common';
import { CommentController } from './task-comments.controller';

@Module({
  imports: [PrismaModule, TaskModule],
  controllers: [CommentController],
  providers: [TaskCommentService, TaskCommentRepository],
  exports: [TaskCommentService],
})
export class TaskCommentModule {}
