import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>, // 👈 TypeORM이 제공하는 DB 조작 도구(Repository) 주입
  ) {}

  // 1. 새 포스트 등록 (Create)
  async create(createBoardDto: Board): Promise<Board> {
    const newPost = this.boardRepository.create(createBoardDto);
    return await this.boardRepository.save(newPost); // DB에 INSERT 실행
  }

  // 2. 전체 포스트 조회 (Read - List)
  async findAll(): Promise<Board[]> {
    return await this.boardRepository.find({
      order: { id: 'DESC' }, // 최신 글이 맨 위로 오도록 내림차순 정렬
    });
  }

  // 3. 특정 포스트 상세 조회 (Read - Detail)
  async findOne(id: number): Promise<Board> {
    const post = await this.boardRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`존재하지 않는 게시글입니다. (ID: ${id})`);
    }
    return post;
  }

  // 4. 포스트 삭제 (Delete)
  async remove(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`삭제할 게시글을 찾을 수 없습니다. (ID: ${id})`);
    }
  }
}