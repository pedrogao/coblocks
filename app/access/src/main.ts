import { NestFactory } from '@nestjs/core';
import { polyfill } from '@coblocks/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { WsAdapter } from './adapter/ws-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useWebSocketAdapter(new WsAdapter(app));

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('http.port');
  
  await app.listen(port);
}

polyfill();
bootstrap();
