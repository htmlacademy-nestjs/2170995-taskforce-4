import { Module } from '@nestjs/common';
import { TaskResponseService } from './task-response.service';
import { TaskResponseController } from './task-response.controller';
import { TaskResponseRepository } from './task-response.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskResponseController],
  providers: [TaskResponseService, TaskResponseRepository],
  exports: [TaskResponseRepository, TaskResponseService],
})
export class TaskResponseModule {}
