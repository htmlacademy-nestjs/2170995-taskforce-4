import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TaskCategoryModule } from './task-category/task-category.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, PrismaModule, TaskCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
