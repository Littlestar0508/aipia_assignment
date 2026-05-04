type NewsCardProps = {
  title: string;
  by: string;
  time: number;
  id: number;
};

function NewsCard({ title, by, time, id }: NewsCardProps) {
  const formatDate = (time: number) => {
    const date = new Date(time * 1000);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  const getPhotoId = (id: number) => {
    let str = '';

    const idStr = String(id);

    str += idStr.charAt(0);
    str += idStr.charAt(3);
    str += idStr.charAt(idStr.length - 1);

    return str;
  };

  return (
    <div className="flex flex-row gap-4 items-center" key={id}>
      <img
        src={`https://picsum.photos/id/${getPhotoId(id)}/100/100`}
        className="w-20 rounded-md border aspect-square"
      />
      <div className="h-20 flex flex-col justify-between whitespace-nowrap overflow-hidden">
        <h2 className="font-bold text-xl">{title}</h2>
        <div>
          <p className="text-gray-500 text-base">{by}</p>
          <p className="text-gray-500 text-base">{formatDate(time)}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
