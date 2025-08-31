import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cors({ origin: '*', credentials: false }));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();