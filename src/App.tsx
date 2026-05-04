import { Route, Routes } from 'react-router';
import MainPage from './pages/mainPage';
import DetailPage from './pages/detailPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto px-4 py-2 min-h-screen w-full max-w-107.5 bg-white">
        <h1 className="font-bold text-4xl mb-4">AIPIA NEWS</h1>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
