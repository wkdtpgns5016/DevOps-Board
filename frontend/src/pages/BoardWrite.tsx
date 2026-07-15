import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BoardWrite() {
  const navigate = useNavigate();
  
  // 입력 폼 상태 관리
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 💡 나중에 백엔드 API와 연결할 영역입니다.
    alert(`글이 임시 저장되었습니다!\n제목: ${title}\n작성자: ${author}\n카테고리: ${category}`);
    navigate('/');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">✍️ 새 포스트 작성</h1>
        <p className="text-sm text-gray-500 mt-1">새로운 기술 정보나 개발 경험을 공유해 주세요.</p>
      </div>

      {/* 폼 레이아웃 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 입력 */}
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

        {/* 작성자 & 카테고리 (2열 구성) */}
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

        {/* 본문 입력 */}
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

        {/* 하단 버튼 제어 */}
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