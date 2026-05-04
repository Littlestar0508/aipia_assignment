function MainPageSkeleton() {
  return (
    <div className="flex animate-pulse flex-row items-center gap-4">
      <div className="aspect-square w-20 rounded-md bg-gray-300" />

      <div className="flex h-20 flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 w-44 rounded bg-gray-300" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>

        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default MainPageSkeleton;
