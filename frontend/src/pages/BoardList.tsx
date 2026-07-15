import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  summary: string;
  author: string;
  createdAt: string;
  category: string;
}

export default function BoardList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  // 화면이 켜질 때 로컬스토리지에서 데이터를 읽어옵니다.
  useEffect(() => {
    const savedPosts = localStorage.getItem('devops_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // 데이터가 아예 없을 때 보여줄 기본 첫 글 세팅
      const initialPost: Post = { 
        id: 1, 
        title: 'Vite React + NestJS 게시판 프로젝트 시작!', 
        summary: '프론트엔드와 백엔드의 아키텍처 설계를 마치고 드디어 본격적인 개발 단계에 진입합니다. 첫 페이지 라우팅 성공!',
        author: '장세훈', 
        createdAt: '2026-07-15',
        category: 'Development'
      };
      setPosts([initialPost]);
      localStorage.setItem('devops_posts', JSON.stringify([initialPost]));
    }
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
            DevOps Board Project
          </span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-2">
            최신 업데이트 아티클
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            개발 및 인프라 구축 과정 기록과 기술 공유를 위한 게시판입니다.
          </p>
        </div>
        <div>
          <button 
            onClick={() => navigate('/write')}
            className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✍️ 새 포스트 작성</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article 
            key={post.id} 
            onClick={() => navigate(`/post/${post.id}`)}
            className="group relative bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[160px]"
          >
            <div>
              <div className="flex items-center gap-3 text-xs mb-3">
                <span className={`font-semibold px-2 py-0.5 rounded ${
                  post.category === 'DevOps' ? 'bg-purple-50 text-purple-600' :
                  post.category === 'Infra' ? 'bg-amber-50 text-amber-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {post.category}
                </span>
                <span className="text-gray-400 font-mono">{post.createdAt}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                {post.title}
              </h2>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase">
                  {post.author ? post.author[0] : 'U'}
                </div>
                <span className="text-xs font-semibold text-gray-700">{post.author}</span>
              </div>
              <span className="text-xs font-bold text-blue-500 group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                자세히 읽기 →
              </span>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-gray-400 text-sm">등록된 글이 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}