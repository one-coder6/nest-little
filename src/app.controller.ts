import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader } from '@nestjs/swagger';
import { NoTransfInterceptor, NoToken } from './decorator/request.decort';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @NoToken()
  @NoTransfInterceptor()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('getHelloByToken')
  getHelloByToken(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @NoToken()
  @NoTransfInterceptor()
  health(): object {
    return {
      status: 'UP',
    };
  }
}
