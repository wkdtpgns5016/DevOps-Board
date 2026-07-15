import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]) // 👈 이게 꼭 있어야 BoardRepository가 활성화됩니다!
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
