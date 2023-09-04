import { Module } from '@nestjs/common';
import { TaskTagService } from './task-tag.service';
import { TaskTagsController } from './task-tag.controller';
import { TaskTagRepository } from './taks-tag.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskTagsController],
  providers: [TaskTagService, TaskTagRepository],
  exports: [TaskTagService],
})
export class TaskTagsModule {}
