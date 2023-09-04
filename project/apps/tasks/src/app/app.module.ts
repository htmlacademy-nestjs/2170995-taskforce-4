import { TaskReviewModule } from './task-reviews/task-reviews.module';
import { TaskCommentModule } from './task-comments/task-comments.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TaskTagsModule } from './task-tag/task-tag.module';
import { TaskResponseModule } from './task-response/task-response.module';

@Module({
  imports: [
    PrismaModule,
    TaskCategoryModule,
    TaskCommentModule,
    TaskReviewModule,
    TaskTagsModule,
    TaskModule,
    TaskResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
