import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionMiddlerare } from './middleware/http-exception.middleware';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionMiddlerare());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
