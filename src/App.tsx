import Tab from '@/components/tab';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto px-4 py-2 min-h-screen w-full max-w-107.5 bg-white">
        <h1 className="font-bold text-4xl">AIPIA NEWS</h1>
        {/* 컨텐츠 영역 */}
        <Tab />
      </main>
    </div>
  );
}

export default App;
