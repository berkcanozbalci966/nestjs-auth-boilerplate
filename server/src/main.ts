import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3600).then(() => {
    console.log('Fuck yeah');
  });
}
bootstrap();
