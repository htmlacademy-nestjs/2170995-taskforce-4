import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const enum DefaultPorts {
  DEFAULT_PORT = 3001,
  DEFAULT_MONGO_PORT = 27017,
  DEFAULT_RABBIT_PORT = 5672,
  DEFAULT_SMTP_PORT = 25,
}

export interface UploaderConfig {
  serveRoot: string;
  environment: string;
  uploadDirectory: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.POR || DefaultPorts.DEFAULT_PORT.toString(), 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DefaultPorts.DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  const validationSchema = Joi.object<UploaderConfig>({
    serveRoot: Joi.string().required(),
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port()
      .default(DefaultPorts.DEFAULT_PORT),
      uploadDirectory: Joi.string(),
      db: Joi.object({
        host: Joi.string().valid().hostname(),
        port: Joi.number().port(),
        name: Joi.string().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
        authBase: Joi.string().required(),
      })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
