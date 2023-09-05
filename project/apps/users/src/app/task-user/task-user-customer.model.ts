import { Document } from 'mongoose';
import { UserCustomer } from '@project/shared/app-types';
import {Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';


@Schema()
export class TaskUserCustomerModel extends Document implements UserCustomer {
  @Prop({
    default: 0,
  })
  public publishedTasks?: number;

  @Prop({
    default: 0,
  })
  public newTasksStatus?: number;

  @Prop({
    default: '',
  })
  public personalInfo?: string;

  @Prop({
    default: new Date(),
  })
  public createdAt?: Date;

}

export const TaskUserCustomerSchema = SchemaFactory.createForClass(TaskUserCustomerModel);

