import { Module } from '@nestjs/common';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskUserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
