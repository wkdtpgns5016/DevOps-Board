import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000/board';
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      author,
      category,
      content
    };

    try {
      // 🚀 백엔드 API로 새 데이터 등록 요청 (POST)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error('포스트 등록 실패');
      
      navigate('/'); // 등록 성공 후 메인 목록 화면으로 이동
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 🔙 목록으로 돌아가기 버튼 (카드 외부 상단 배치) */}
      <button 
        type="button"
        onClick={() => navigate('/')}
        className="text-xs font-bold text-blue-500 hover:text-blue-600 mb-6 flex items-center gap-1.5 transition-colors"
      >
        ← 목록으로 돌아가기
      </button>

      {/* 💡 [수정 포인트] 새 포스트 작성 폼 전체를 감싸는 흰색 카드 레이아웃 추가! */}
      <div className="rounded-2xl border border-slate-100 bg-white p-10 shadow-sm">
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

          {/* 🔘 하단 액션 버튼 영역 */}
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
    </div>
  );
}