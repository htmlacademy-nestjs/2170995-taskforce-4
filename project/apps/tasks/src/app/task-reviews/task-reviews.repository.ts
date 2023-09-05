import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskReviewEntity } from './task-reviews.entiti';
import { Review } from '@project/shared/app-types';
import { CRUDRepository } from '@project/util/util-types';

@Injectable()
export class TaskReviewRepository
  implements CRUDRepository<TaskReviewEntity, number, Review>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskReviewEntity): Promise<Review> {
    const entityData = item.toObject();
    return this.prisma.review.create({
      data: {
        ...entityData,
      },
    });
  }

  public findById(reviewId: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: {
        reviewId,
      },
    });
  }

  public find(ids: number[] = []): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        reviewId: {
          in: ids.length > 0 ? ids: undefined
        }
      }
    });
  }

  public findByExecutorId(executorId: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: {
        executorId,
      },
    });
  }

  public async getRatingSum(executorId: string): Promise<number> {
    const ratingSum = await this.prisma.review.aggregate({
      _sum: {
        rating: true,
      },
      where: {
        executorId,
      },
    });
    return ratingSum._sum.rating;
  }

  public async destroy(reviewId: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        reviewId,
      },
    });
  }

  public async destroyByExecutorId(executorId: string): Promise<void> {
    await this.prisma.review.deleteMany({
      where: {
        executorId,
      },
    });
  }

  public update(reviewId: number, item: TaskReviewEntity): Promise<Review> {
    return Promise.resolve(undefined);
  }
}
