import { useEffect, useState, useRef } from 'react';
import NewsCard from './newsCard';
import useTabStateStore from '@/utils/TabStateStore';

type CurrentNewsList = {
  id: number;
  title: string;
  by: string;
  time: number;
  url?: string;
};

const PAGE_SIZE = 10;

const getNewsListUrl = (tabState: string) => {
  switch (tabState) {
    case 'new':
      return 'https://hacker-news.firebaseio.com/v0/newstories.json';
    case 'best':
      return 'https://hacker-news.firebaseio.com/v0/beststories.json';
    case 'top':
    default:
      return 'https://hacker-news.firebaseio.com/v0/topstories.json';
  }
};

function NewsList() {
  const { tabState } = useTabStateStore();

  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [currentNewsList, setCurrentNewsList] = useState<CurrentNewsList[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchStoryIds = async () => {
      setIsLoading(true);
      setCurrentNewsList([]);
      setPage(0);

      try {
        const res = await fetch(getNewsListUrl(tabState));
        const ids: number[] = await res.json();

        setStoryIds(ids);
      } catch (error) {
        console.error('뉴스 ID 목록 호출 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryIds();
  }, [tabState]);

  useEffect(() => {
    if (storyIds.length === 0) return;

    const fetchNewsItems = async () => {
      setIsLoading(true);

      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const currentIds = storyIds.slice(start, end);

      try {
        const newsItems = await Promise.all(
          currentIds.map(async (id) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            );

            return res.json();
          }),
        );

        setCurrentNewsList((prev) => [...prev, ...newsItems]);
      } catch (error) {
        console.error('뉴스 상세 호출 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsItems();
  }, [storyIds, page]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <div className="my-4 flex flex-col gap-4">
      {currentNewsList.map((news) => (
        <NewsCard
          key={news.id}
          title={news.title}
          by={news.by}
          time={news.time}
        />
      ))}

      <div ref={observerRef} className="h-10" />

      {isLoading && (
        <p className="text-center text-sm text-gray-400">불러오는 중...</p>
      )}
    </div>
  );
}

export default NewsList;
