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

  useEffect(() => {
    const savedPosts = localStorage.getItem('devops_posts');
    if (savedPosts && id) {
      const posts: Post[] = JSON.parse(savedPosts);
      // URL 파라미터 id와 일치하는 포스트 검색 (타입 변환 주의)
      const foundPost = posts.find((p) => p.id === Number(id));
      if (foundPost) {
        setPost(foundPost);
      }
    }
  }, [id]);

  // 글 삭제 기능 추가
  const handleDelete = () => {
    if (window.confirm('정말 이 포스트를 삭제하시겠습니까?')) {
      const savedPosts = localStorage.getItem('devops_posts');
      if (savedPosts && id) {
        const posts: Post[] = JSON.parse(savedPosts);
        const filteredPosts = posts.filter((p) => p.id !== Number(id));
        localStorage.setItem('devops_posts', JSON.stringify(filteredPosts));
        navigate('/');
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
    <div className="p-8 max-w-3xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="text-xs font-bold text-blue-500 hover:text-blue-600 mb-6 flex items-center gap-1.5 transition-colors"
      >
        ← 목록으로 돌아가기
      </button>

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
          <span className="font-mono">{post.createdAt}</span>
        </div>
      </header>

      <article className="prose max-w-none text-gray-700 leading-relaxed text-base whitespace-pre-line">
        {post.content}
      </article>

      <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between">
        <button 
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
        >
          목록
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleDelete}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}