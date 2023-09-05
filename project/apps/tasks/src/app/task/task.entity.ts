import { Task, Tag, Response, Comment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public taskId?: number;
  public title: string;
  public description: string;
  public categoryId: number;
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
  public executorId?: string;
  public responses?: Response[];
  public comments?: Comment[];
  public responsesCount?: number;
  public commentsCount?: number;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task): void {
    this.taskId = entity.taskId;
    this.title = entity.title;
    this.description = entity.description;
    this.categoryId = entity.categoryId;
    this.price = entity.price;
    this.dueDate = entity.dueDate;
    this.image = entity.image;
    this.address = entity.address;
    this.tags = [...entity.tags];
    this.city = entity.city;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = entity.status;
    this.userId = entity.userId;
    this.executorId = entity.executorId;
    this.responses = [];
    this.comments = [];
    this.responsesCount = entity.responsesCount;
    this.commentsCount = entity.commentsCount;
  }

  public toObject() {
    return {
      ...this,
      comments: [...this.comments],
      tags: [...this.tags],
      responses: [...this.responses],
    };
  }
}

