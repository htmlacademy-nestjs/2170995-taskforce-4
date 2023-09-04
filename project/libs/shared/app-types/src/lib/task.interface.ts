import {  Tag, Comment, Response, Review  } from '../index'

export interface Task {
  taskId?: number;
  title: string;
  description: string;
  categoryId: number;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: Tag[];
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  userId?: string;
  executorId?: string;
  responsesCount?: number;
  commentsCount?: number;
  comments?: Comment[];
  responses?: Response[];
  review?: Review;
}
