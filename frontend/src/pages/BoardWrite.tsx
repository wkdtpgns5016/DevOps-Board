import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 기존 로컬스토리지에 저장된 글 가져오기 (없으면 빈 배열)
    const existingPostsRaw = localStorage.getItem('devops_posts');
    const existingPosts = existingPostsRaw ? JSON.parse(existingPostsRaw) : [
      { 
        id: 1, 
        title: 'Vite React + NestJS 게시판 프로젝트 시작!', 
        summary: '프론트엔드와 백엔드의 아키텍처 설계를 마치고 드디어 본격적인 개발 단계에 진입합니다. 첫 페이지 라우팅 성공!',
        author: '장세훈', 
        createdAt: '2026-07-15',
        category: 'Development',
        content: '프론트엔드와 백엔드의 아키텍처 설계를 마치고 드디어 본격적인 개발 단계에 진입합니다. 첫 페이지 라우팅도 완벽하게 성공했습니다. 앞으로 최신 Tailwind CSS v4를 활용한 힙한 디자인을 입히고, 백엔드 NestJS와의 API 조율 과정을 거치며 점점 더 완성도 높은 애플리케이션을 완성해 나갈 예정입니다.'
      }
    ];

    // 2. 새 포스트 객체 생성 (id는 겹치지 않게 고유값 타임스탬프 활용)
    const newPost = {
      id: Date.now(), // 고유 ID
      title,
      summary: content.substring(0, 100) + (content.length > 100 ? '...' : ''), // 앞 100자만 요약
      author,
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD 포맷
      category,
      content
    };

    // 3. 기존 목록에 추가 후 로컬스토리지 저장
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem('devops_posts', JSON.stringify(updatedPosts));

    // 4. 메인 목록 화면으로 이동
    navigate('/');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">✍️ 새 포스트 작성</h1>
        <p className="text-sm text-gray-500 mt-1">새로운 기술 정보나 개발 경험을 공유해 주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">제목</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="포스트의 제목을 입력하세요"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">작성자</label>
            <input 
              type="text" 
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름 또는 닉네임"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">카테고리</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm bg-white"
            >
              <option value="Development">Development</option>
              <option value="DevOps">DevOps</option>
              <option value="Infra">Infra</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">내용</label>
          <textarea 
            required
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에 생각이나 기술을 자유롭게 공유해 보세요..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200"
          >
            포스트 등록
          </button>
        </div>
      </form>
    </div>
  );
}