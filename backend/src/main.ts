import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://www.your-frontend-domain.com'], // Replace with your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to handle cookies or authorization headers
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
}));
  await app.listen(4000);
}
bootstrap();
