import { Response } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TaskResponseEntity implements Entity<TaskResponseEntity>, Response {
  public responseId: number;
  public executorId: string;
  public taskId: number;
  public offerPrice: number;

  constructor(resp: Response) {
    this.fillEntity(resp);
  }

  public fillEntity(entity: Response) {
    this.responseId = entity.responseId;
    this.executorId = entity.executorId;
    this.taskId = entity.taskId;
    this.offerPrice = entity.offerPrice;
  }

  public toObject(): TaskResponseEntity {
    return { ...this };
  }
}
