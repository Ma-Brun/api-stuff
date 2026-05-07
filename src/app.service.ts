import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private customMessage = '';

  getHello(): string {
    return 'Hello World!';
  }

  greet(): string {
    return 'Greetings from NestJS!';
  }

  setCustomMessage(message: string): string {
    this.customMessage = message;
    return this.customMessage;
  }

  getCustomMessage(): string {
    return this.customMessage;
  }
}
