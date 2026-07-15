import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.enableCors({
    origin: [
      'http://localhost:5173', // 로컬 테스트용 허용
       // S3 배포 주소 허용
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
}
bootstrap();
