import { Document } from 'mongoose';
import { UserExecutor } from '@project/shared/app-types';
import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';


@Schema()
export class TaskUserExecutorModel extends Document implements UserExecutor {
  @Prop({
    default: 0,
  })
  public age?: number;

  @Prop({
    default: 0,
  })
  public rating?: number;

  @Prop({
    default: 0,
  })
  public completedTasks?: number;

  @Prop({
    default: 0,
  })
  public failedTasks?: number;

  @Prop({
    default: '',
  })
  public specialization?: string[];

  @Prop({
    default: 0,
  })
  public placeInRating?: number;

  @Prop({
    default: '',
  })
  public personalInfo?: string;

}

export const TaskUserExecutorSchema = SchemaFactory.createForClass(TaskUserExecutorModel);
