import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { polyfill } from '@coblocks/common';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);
  const port = configService.get('http.port');

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  await app.listen(port);
}

polyfill();
bootstrap();
