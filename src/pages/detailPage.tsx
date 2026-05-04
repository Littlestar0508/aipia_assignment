import DetailPageSkeleton from '@/components/detailPageSkeleton';
import formatDate from '@/utils/timeFormatter';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

type ContentType = {
  id: number;
  by: string;
  time: number;
  kids?: number[];
  score: number;
  title: string;
  type: string;
  url?: string;
};

function DetailPage() {
  const id = useParams();

  const [content, setContent] = useState<ContentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id.id}.json`,
        );

        const data: ContentType = await res.json();

        console.log(data);
        setContent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <DetailPageSkeleton />
      ) : (
        <>
          <h2 className="text-2xl font-bold">{content?.title}</h2>
          <div className="my-4 flex flex-row justify-between text-gray-500 text-base">
            <div>{content?.by}</div>
            <div>{formatDate(content!.time)}</div>
          </div>
          <div className="font-bold my-4">점수 : {content?.score}</div>
          <a href={content?.url} className="underline">
            자세히 보기
          </a>
        </>
      )}
    </>
  );
}

export default DetailPage;
