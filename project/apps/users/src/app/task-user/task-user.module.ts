import { UserRole } from '@project/shared/app-types';
import { TaskUserRepository } from './task-user.repository';
import { TaskUserSchema, TaskUserModel } from './task-user.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserCustomerSchema } from './task-user-customer.model';
import { TaskUserExecutorSchema } from './task-user-executor.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: TaskUserModel.name,
      schema: TaskUserSchema,
      discriminators: [
        { name: UserRole.Customer, schema: TaskUserCustomerSchema },
        { name: UserRole.Executor, schema: TaskUserExecutorSchema },
      ]
    }
  ])],
  providers: [TaskUserRepository],
  exports: [TaskUserRepository],
})
export class TaskUserModule {}
