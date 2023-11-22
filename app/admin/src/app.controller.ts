import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get(['', '/'])
  index(): string {
    return '<h1>Coblocks Admin API</h1>';
  }
}
