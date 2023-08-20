import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import uploaderConfig from './uploader.config';

const ENV_FILE_PATH = 'apps/uploader/.uploader.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [uploaderConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigUploaderModule {}
