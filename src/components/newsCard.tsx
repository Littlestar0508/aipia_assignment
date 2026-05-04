function NewsCard() {
  return (
    <div className="flex flex-row gap-4 items-center">
      <img src="/" className="w-20 rounded-md border aspect-square" />
      <div className="h-20 flex flex-col justify-between">
        <h2 className="font-bold text-xl">제목</h2>
        <div>
          <p className="text-gray-500 text-base">author</p>
          <p className="text-gray-500 text-base">000-00-01</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
