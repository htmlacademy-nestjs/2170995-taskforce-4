import { TaskReviewRepository } from './task-reviews.repository';
import { TaskReviewService } from './task-reviews.service';
import { Module } from '@nestjs/common';
import { TaskReviewController } from './task-reviews.controller';

@Module({
  imports: [],
  controllers: [TaskReviewController],
  providers: [TaskReviewService, TaskReviewRepository],
  exports: [TaskReviewRepository]
})
export class TaskReviewModule {}
