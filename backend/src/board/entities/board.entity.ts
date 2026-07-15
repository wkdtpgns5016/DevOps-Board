import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('board') // 데이터베이스에 'board'라는 이름의 테이블을 생성합니다.
export class Board {
  @PrimaryGeneratedColumn() // 중복되지 않는 고유 ID (1, 2, 3... 순서대로 자동 증가)
  id: number;

  @Column({ type: 'varchar', length: 150 }) // 최대 150자 제한의 문자열 컬럼 (제목)
  title: string;

  @Column({ type: 'text' }) // 글자 수 제한이 없는 긴 텍스트 컬럼 (본문 내용)
  content: string;

  @Column({ type: 'varchar', length: 50 }) // 작성자 이름
  author: string;

  @Column({ type: 'varchar', length: 50, default: 'Development' }) // 카테고리 (기본값 설정)
  category: string;

  @CreateDateColumn() // 데이터가 저장되는 순간의 날짜/시간이 자동으로 입력되는 컬럼
  createdAt: Date;
}