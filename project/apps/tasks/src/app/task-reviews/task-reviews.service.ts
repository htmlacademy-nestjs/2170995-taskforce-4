import { Injectable } from '@nestjs/common';
import { Review } from '@project/shared/app-types';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskReviewEntity } from './task-reviews.entiti';
import { TaskReviewRepository } from './task-reviews.repository';

@Injectable()
export class TaskReviewService {
  constructor(private readonly taskReviewRepository: TaskReviewRepository) {}

  async findByExecutorId(executorId: string) {
    return this.taskReviewRepository.findByExecutorId(executorId);
  }
  async findRating(executorId: string) {
    const ratingsSum = await this.taskReviewRepository.getRatingSum(executorId);
    const reviews = await this.taskReviewRepository.reviewsCount(executorId);
    const failedTasks = await this.taskReviewRepository.executorFiledTasksCount(executorId);

    return (ratingsSum / (reviews + failedTasks));
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
