import { Route, Routes } from 'react-router';
import MainPage from './pages/mainPage';
import DetailPage from './pages/detailPage';
import ErrorBoundary from './components/errorBoundary';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto min-h-screen w-full max-w-107.5 bg-white px-4 py-2 relative">
        <h1 className="mb-4 text-4xl font-bold">AIPIA NEWS</h1>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/news/:id" element={<DetailPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
