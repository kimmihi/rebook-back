import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  app.enableCors({
    origin: true,
  });

  await app.listen(serverConfig.port);
}
bootstrap();
