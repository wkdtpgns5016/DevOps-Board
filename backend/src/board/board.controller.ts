import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 1. 글 등록 (POST /board)
  @Post()
  create(@Body() createBoardDto: Board) {
    return this.boardService.create(createBoardDto);
  }

  // 2. 글 전체 조회 (GET /board)
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  // 3. 글 상세 조회 (GET /board/:id)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  // 4. 글 삭제 (DELETE /board/:id)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}