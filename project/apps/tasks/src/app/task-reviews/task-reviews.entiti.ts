import { Review } from '@project/shared/app-types';

export class TaskReviewEntity implements Review {
  public reviewId?: number;
  public review: string;
  public taskId: number;
  public rating: number;
  public userId: string;
  public executorId: string;
  public createdAt: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(review: Review) {
    this.reviewId = review.reviewId;
    this.review = review.review;
    this.taskId = review.taskId;
    this.rating = review.rating;
    this.userId = review.userId;
    this.executorId = review.executorId;
    this.createdAt = review.createdAt;
  }
}
