import { ConfigUserModule, getMongooseOptions } from '@project/config/config-users';
import { Module } from '@nestjs/common';
import { TaskUserModule } from './task-user/task-user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskUserModule,
    AuthModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )],
  controllers: [],
  providers: [],
})
export class AppModule {}
