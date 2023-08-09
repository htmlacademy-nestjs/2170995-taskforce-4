import { User, UserRole, City } from '@project/shared/app-types';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class TaskUserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: City,
    default: City.Moscow,
  })
  public city: City;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Customer,
  })
  public role: UserRole;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateOfBirth: Date;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
