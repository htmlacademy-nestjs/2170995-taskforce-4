import { City, TaskStatus } from '@project/shared/app-types';

export class AddNewTaskDto {
  public title: string;
  public description: string;
  public categories: number[];
  public price?: number;
  public dueDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: number[];
  public city: City;
  public status: TaskStatus;
  public userId: string;
}
