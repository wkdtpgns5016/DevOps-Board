import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';

function App() {
  return (
    <BrowserRouter>
      {/* 화면 전체를 감싸는 기본 레이아웃 컨테이너 */}
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white shadow-sm py-4 px-6 mb-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <span className="text-xl font-extrabold text-blue-600 cursor-pointer">
              DevOps-Board 🚀
            </span>
            <span className="text-sm text-gray-500">React + TS + Tailwind</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-md min-h-[500px]">
          <Routes>
            {/* 기본 경로: 목록 페이지 */}
            <Route path="/" element={<BoardList />} />
            {/* /write 경로: 글 작성 페이지 */}
            <Route path="/write" element={<BoardWrite />} />
            {/* /post/:id 경로: 글 상세 페이지 (:id는 동적 파라미터) */}
            <Route path="/post/:id" element={<BoardDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;