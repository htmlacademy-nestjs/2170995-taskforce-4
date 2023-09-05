export interface Review {
  reviewId?: number;
  review: string;
  taskId: number;
  rating: number;
  userId: string;
  executorId: string;
  createdAt?: Date;
}
