import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  category: string;
  content: string;
}

export default function BoardDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  
  // 🔄 백엔드에서 특정 ID의 포스트만 상세 조회
  useEffect(() => {
    if (!id) return;
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('포스트 상세 불러오기 실패');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };
    fetchPostDetail();
  }, [id]);

  // 🗑️ 백엔드 DELETE 요청으로 글 삭제
  const handleDelete = async () => {
    if (window.confirm('정말 이 포스트를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('글 삭제 실패');
        navigate('/'); // 삭제 성공 시 홈으로 리다이렉트
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500 mb-4">존재하지 않거나 삭제된 포스트입니다.</p>
        <button onClick={() => navigate('/')} className="text-blue-500 font-bold">홈으로 가기</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* 🔙 목록으로 돌아가기 버튼 (상단 내비게이션 역할) */}
      <button 
        onClick={() => navigate('/')}
        className="text-xs font-bold text-blue-500 hover:text-blue-600 mb-6 flex items-center gap-1.5 transition-colors"
      >
        ← 목록으로 돌아가기
      </button>

      {/* 💡 상세 보기 흰색 카드 컨테이너 */}
      <div className="rounded-2xl border border-slate-100 bg-white p-10 shadow-sm">
        <header className="mb-8 pb-6 border-b border-gray-100">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{post.author}</span>
            <span className="text-slate-300">•</span>
            <span className="font-mono">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        {/* 📝 아티클 본문 */}
        <article className="prose max-w-none text-gray-700 leading-relaxed text-base whitespace-pre-line">
          {post.content}
        </article>

        {/* 🔘 하단 액션 버튼 영역 (삭제 버튼을 둥근 빨간 사각형 형태로 트렌디하게 변경) */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
          <button 
            onClick={handleDelete}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}