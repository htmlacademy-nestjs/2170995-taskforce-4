import { Category, Task, City, TaskStatus, Tag, Response, Comment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public id?: number;
  public title: string;
  public description: string;
  public categories: Category[];
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: Tag[];
  public city: string;
  public createdAt: Date;
  public updatedAt?: Date;
  public status: string;
  public userId: string;
  public responses?: Response[];
  public comments?: Comment[];

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task): void {
    this.title = entity.title;
    this.description = entity.description;
    this.categories = [...entity.categories];
    this.price = entity.price;
    this.dueDate = entity.dueDate;
    this.image = entity.image;
    this.address = entity.address;
    this.tags = [];
    this.city = entity.city;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.status = entity.status;
    this.userId = entity.userId;
    this.responses = [];
    this.comments = [];
  }

  public toObject() {
    return {
      ...this,
      categories: [...this.categories],
      comments: [...this.comments],
      tags: [...this.tags],
      responses: [...this.responses],
    };
  }
}

