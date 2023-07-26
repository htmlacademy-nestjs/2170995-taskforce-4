import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { TaskUserModule } from './../task-user/task-user.module';

@Module({
  imports: [TaskUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
