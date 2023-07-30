import { TaskStatus } from './task-status.enum';
import { City } from './city.enum';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price?: number;
  dueDate?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  city: City;
  createdAt: Date;
  updatedAt?: Date;
  status: TaskStatus;
  userId: string;
  responses?: string[];
  comments?: string[];
}
