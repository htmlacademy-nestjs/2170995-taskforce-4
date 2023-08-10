import { TaskUserRepository } from './task-user.repository';
import { TaskUserSchema, TaskUserModel } from './task-user.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaskUserModel.name, schema: TaskUserSchema }
  ])],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository],
})
export class TaskUserModule {}
