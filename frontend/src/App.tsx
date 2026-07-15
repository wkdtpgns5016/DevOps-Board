import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';

function App() {
  return (
    // 💡 BrowserRouter를 App.tsx 내부에 직접 탑재하여 라우터가 없는 에러를 완벽하게 방지합니다!
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        {/* 🚀 상단 내비게이션 바 */}
        <header className="border-b border-slate-200 bg-white px-8 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link to="/" className="flex items-center gap-2 cursor-pointer no-underline">
              <span className="text-2xl font-black tracking-tight text-blue-600">DevOps-Board🚀</span>
            </Link>
            <span className="text-sm font-semibold text-slate-400">React + TS + Tailwind</span>
          </div>
        </header>

        {/* 📂 메인 콘텐츠 및 라우터 스위칭 영역 */}
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/post/:id" element={<BoardDetail />} />
            <Route path="/write" element={<BoardWrite />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;