// 세부 페이지 스켈레톤 UI
function DetailPageSkeleton() {
  return (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-6 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/3 bg-gray-300 rounded" />
      <div className="w-full h-56 bg-gray-300 rounded-md" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default DetailPageSkeleton;
