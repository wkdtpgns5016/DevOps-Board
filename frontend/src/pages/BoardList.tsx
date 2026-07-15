import { useNavigate } from 'react-router-dom';

// 현대적인 피드 구성을 위한 임시 데이터 수정
const mockPosts = [
  { 
    id: 1, 
    title: 'Vite React + NestJS 게시판 프로젝트 시작!', 
    summary: '프론트엔드와 백엔드의 아키텍처 설계를 마치고 드디어 본격적인 개발 단계에 진입합니다. 첫 페이지 라우팅 성공!',
    author: '장세형', 
    createdAt: '2026-07-15',
    category: 'Development'
  },
  { 
    id: 2, 
    title: 'GitLab Runner로 CI/CD 무중단 배포 구현하기', 
    summary: 'EC2 환경 내부에 프라이빗 GitLab 서버와 Runner를 Docker 컨테이너 기반으로 연동하여 빌드 파이프라인을 구축하는 꿀팁.',
    author: 'DevOps_Master', 
    createdAt: '2026-07-14',
    category: 'DevOps'
  },
  { 
    id: 3, 
    title: 'Docker Compose로 개발 환경을 통일하는 방법', 
    summary: '팀원들과 로컬 개발 데이터베이스 환경(MySQL 8.0) 설정을 단 한 줄의 명령어로 일치시키는 컨테이너 오케스트레이션 구성.',
    author: 'DockerLover', 
    createdAt: '2026-07-12',
    category: 'Infra'
  },
];

export default function BoardList() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* 상단 헤더 영역 */}
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

      {/* 카드 / 피드 리스트 */}
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <article 
            key={post.id} 
            onClick={() => navigate(`/post/${post.id}`)}
            className="group relative bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[160px]"
          >
            <div>
              {/* 카테고리 태그 및 작성일 */}
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

              {/* 제목 */}
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                {post.title}
              </h2>

              {/* 본문 요약 (Summary) */}
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </div>

            {/* 푸터 영역 (작성자 및 읽기 버튼) */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase">
                  {post.author[0]}
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

      {mockPosts.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-2xl">
          <p className="text-gray-400 text-sm">등록된 글이 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
}