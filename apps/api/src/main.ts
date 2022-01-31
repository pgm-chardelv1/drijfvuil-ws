/**
 * Imports
 */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

// Local imports
import { AppModule } from './app/app.module';

/**
 * Bootstrap the application and create the app module
 * Set up CORS access for localhost and front-end access
 * Configure port number for local and production values
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4200', 'https://drijf.onrender.com'],
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3333);

  /**
   * Set up AWS-SDK configuration
   */
  config.update({
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    region: configService.get<string>('AWS_REGION'),
  });

  // Start listening on declared port
  await app.listen(port);
  const env = process.env.NODE_ENV;

  // Log the environment
  console.log(env);

  // Depending on environment; handle message
  env !== 'development'
    ? Logger.log(
        `🚀 GraphQL playground is running on: https://drijfvuil-api.onrender.com:${port}/graphql`,
      )
    : Logger.log(
        `🚀 GraphQL playground is running on: http://localhost:${port}/graphql`,
      );
}

bootstrap();
