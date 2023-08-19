import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { TaskUserModule } from './../task-user/task-user.module';
import {  JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {  getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    TaskUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
  ],
})
export class AuthModule {}
