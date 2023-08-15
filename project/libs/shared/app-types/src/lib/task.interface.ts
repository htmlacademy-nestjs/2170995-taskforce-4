import {  Tag, Category, TaskStatus, City, Comment, Response  } from '../index'

export interface Task {
  id?: number;
  title: string;
  description: string;
  categories: Category[];
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: Tag[];
  city: string;
  createdAt: Date;
  updatedAt?: Date;
  status: string;
  userId: string;
  responses?: Response[];
  comments?: Comment[];
}
