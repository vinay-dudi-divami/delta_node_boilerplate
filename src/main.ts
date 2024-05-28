import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initiateDBConnection } from './common/config/db-connection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { createLogger } from './common/config/winstonLogger';

async function bootstrap() {
  // Create NestJS application instance
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'prod'
        ? createLogger()
        : new Logger('Bootstrap'),
  });
  // Create a logger instance
  const logger = new Logger('Bootstrap');

  // Define Swagger documentation options
  const options = new DocumentBuilder()
    .setTitle('nestjs template')
    .setDescription('nestjs template folder structure and middleware')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addBearerAuth(
      {
        type: 'http',
        name: 'Authorization',
        description: 'Enter access token',
        in: 'header',
      },
      'Authorization',
    )
    .build();

  // Setup Swagger documentation at /api-docs endpoint
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // Enable Cross-Origin Resource Sharing (CORS) for all origins
  app.enableCors({
    origin: [process.env.CORS_ORIGIN_URL, '*'],
    credentials: true,
  });

  try {
    // Initiate the relational database (mysql,sql,postgres,oracle) connection globally
    await initiateDBConnection();
    // Initiate the non relational database (mongoDB) connection globally
    // await initiateMongoDBConnection();
  } catch (error) {
    // Handle the error, such as logging it or retrying the connection
    console.error('Failed to initialize database connection:', error);
  }

  // Initiate the non relational database (mongoDB) connection globally
  // await initiateMongoDBConnection();

  // Validate the payload data using DTOs globally
  app.useGlobalPipes(new ValidationPipe());

  // Start listening to incoming requests on configured port
  await app.listen(process.env.HTTP_PORT);
  logger.log(`Application is listening on port ${process.env.HTTP_PORT}`);
}
// Execute the bootstrap function
bootstrap();
