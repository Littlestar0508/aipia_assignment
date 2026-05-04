type NewsCardProps = {
  title: string;
  by: string;
  time: number;
};

function NewsCard({ title, by, time }: NewsCardProps) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <img src="/" className="w-20 rounded-md border aspect-square" />
      <div className="h-20 flex flex-col justify-between">
        <h2 className="font-bold text-xl">{title}</h2>
        <div>
          <p className="text-gray-500 text-base">{by}</p>
          <p className="text-gray-500 text-base">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
