import { NotifyModule } from './notify/notify.module';
import { ConfigTasksModule } from '@project/config/config-tasks';
import { AuthenticationModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/role.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
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
    AuthenticationModule,
    ConfigTasksModule,
    NotifyModule
  ],
  controllers: [],
  providers: [
    JwtAuthGuard,
    RolesGuard
  ],
})
export class AppModule {}
