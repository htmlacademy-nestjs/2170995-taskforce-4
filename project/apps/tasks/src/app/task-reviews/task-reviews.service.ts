import { Injectable } from '@nestjs/common';
import { Review } from '@project/shared/app-types';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskReviewEntity } from './task-reviews.entiti';
import { TaskReviewRepository } from './task-reviews.repository';

@Injectable()
export class TaskReviewService {
  constructor(private readonly taskReviewRepository: TaskReviewRepository) {}

  findByExecutorId(executorId: string) {
    return this.taskReviewRepository.findByExecutorId(executorId);
  }
  findRating(executorId: string) {
    return this.taskReviewRepository.getRatingSum(executorId);
  }
  async create(dto: CreateReviewDto): Promise<Review> {
    const reviewEntity = await new TaskReviewEntity({ ...dto });

    return this.taskReviewRepository.create(reviewEntity);
  }

  async findAll(): Promise<Review[]> {
    return this.taskReviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    return this.taskReviewRepository.findById(id);
  }

  async delete(id: number): Promise<void> {
    return this.taskReviewRepository.destroy(id);
  }

  async deleteByExecutorId(executorId: string) {
    return this.taskReviewRepository.destroyByExecutorId(executorId);
  }
}
