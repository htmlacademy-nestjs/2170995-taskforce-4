import { ReviewMemoryRepository } from './review-memory.repository';
import { ReviewService } from './review.service';
import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewMemoryRepository],
})
export class ReviewModule {}
