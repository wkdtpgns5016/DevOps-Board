import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 1. .env 환경설정 파일 로드 활성화
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. TypeORM을 사용한 MySQL 자동 연결 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 프로젝트 내 모든 Entity 파일 감지
        synchronize: true, // ⚠️ 개발 환경 전용: 코드를 바탕으로 테이블을 자동 생성해 줍니다.
      }),
    }),
  ],
})
export class AppModule {}