import { Tag } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskTagEntity implements Entity<TaskTagEntity>, Tag {
  public tagId: number;
  public text: string;
  public createdAt?: Date;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.tagId = entity.tagId;
    this.text = entity.text;
    this.createdAt = new Date();
  }

  public toObject(): TaskTagEntity {
    return { ...this };
  }
}
