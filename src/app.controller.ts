import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('greet')
  greet(): string {
    return this.appService.greet();
  }

  @Get('Hola')
  @Header('Content-Type', 'text/html')
  hola(): {greeting: string} {
    return {greeting: 'Hola, bienvenido a NestJS!'};
  }

  @Post('custom-message-post')
  setCustomMessage(@Body('message') message: string): string {
    return this.appService.setCustomMessage(message);
  }

  @Get('custom-message')
  getCustomMessage(): string {
    return this.appService.getCustomMessage();
  }

  
}
