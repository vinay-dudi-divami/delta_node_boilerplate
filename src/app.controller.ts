import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

// Controller responsible for handling health check requests
@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint for health check
  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
}
