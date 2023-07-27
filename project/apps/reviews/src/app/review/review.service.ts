import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Injectable } from '@nestjs/common';
import { ReviewMemoryRepository } from './review-memory.repository';
import dayjs from 'dayjs';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewMemoryRepository: ReviewMemoryRepository
  ) {}

  public async createReview(dto: CreateReviewDto) {
    const review = { ...dto, userId: '', createdAt: dayjs(Date()).toDate()};
    const reviewEntity = await new ReviewEntity(review);

    return this.reviewMemoryRepository.create(reviewEntity)
  }

  public async getReview(id: string) {
    return this.reviewMemoryRepository.findById(id);
  }

  public async deleteReview(id: string) {
    return this.reviewMemoryRepository.destroy(id);
  }
}
