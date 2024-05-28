import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/response-handler/global-exception.filter';

@Module({
  // Import other modules for configuration and functionality
  imports: [
    // Configuring environment variables
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environment/${process.env.NODE_ENV}.env`,
    }),
    // Configure the JwtModule for JWT token handling
    JwtModule.register({
      global: true,
      // Setting the JWT secret from environment variables
      secret: process.env.ACCESS_TOKEN_SECRET,
      // Setting token expiration
      signOptions: {
        expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME, 10) + 's',
      },
    }),
  ],

  // Define controllers for request handling
  controllers: [AppController],

  // Define providers for dependency injection
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
