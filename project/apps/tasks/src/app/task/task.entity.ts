import { Task } from '@project/shared/app-types';
import { City, TaskStatus } from '@project/shared/app-types';

export class TaskEntity implements Task {
  public _id?: string;
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city: City;
  public createdAt: Date;
  public updatedAt?: Date;
  public status: TaskStatus;
  public userId: string;
  public responses?: string[];
  public comments?: string[];

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject() {
    return {
    _id: this._id,
    title: this.title,
    description: this.description,
    category: this.category,
    price: this.price,
    dueDate: this.dueDate,
    image: this.image,
    address: this.address,
    tags: this.tags,
    city: this.city,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    status: this.status,
    userId: this.userId,
    responses: this.responses,
    comments: this.comments,
    }
  }

  public fillEntity(task: Task) {
    this._id = task._id;
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price;
    this.dueDate = task.dueDate;
    this.image = task.image;
    this.address = task.address;
    this.tags = task.tags;
    this.city = task.city;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.status = task.status;
    this.userId = task.userId;
    this.responses = task.responses;
    this.comments = task.comments;
  }
}

