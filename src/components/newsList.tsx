import { useEffect, useState, useRef } from 'react';
import NewsCard from './newsCard';
import useTabStateStore from '@/utils/TabStateStore';
import MainPageSkeleton from './mainPageSkeleton';

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

  const [error, setError] = useState<Error | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  if (error) {
    throw error;
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchStoryIds = async () => {
      setIsLoading(true);
      setStoryIds([]);
      setCurrentNewsList([]);
      setPage(0);
      setError(null);

      try {
        const res = await fetch(getNewsListUrl(tabState), {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('뉴스 ID 목록 호출 실패');
        }

        const ids: number[] = await res.json();
        setStoryIds(ids);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;

        setError(error instanceof Error ? error : new Error('뉴스 호출 실패'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryIds();

    return () => controller.abort();
  }, [tabState]);

  useEffect(() => {
    if (storyIds.length === 0) return;

    const controller = new AbortController();

    const fetchNewsItems = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);

      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const currentIds = storyIds.slice(start, end);

      if (currentIds.length === 0) {
        setIsLoading(false);
        isFetchingRef.current = false;
        return;
      }

      try {
        const newsItems = await Promise.all(
          currentIds.map(async (id) => {
            const res = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
              { signal: controller.signal },
            );

            if (!res.ok) {
              throw new Error('뉴스 상세 호출 실패');
            }

            return res.json();
          }),
        );

        setCurrentNewsList((prev) => {
          const merged = [...prev, ...newsItems];

          return merged.filter(
            (news, idx, self) =>
              idx === self.findIndex((item) => item.id === news.id),
          );
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;

        setError(error instanceof Error ? error : new Error('뉴스 호출 실패'));
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchNewsItems();

    return () => controller.abort();
  }, [storyIds, page]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-4 flex flex-col gap-4">
      {currentNewsList.map((news) => (
        <NewsCard
          key={news.id}
          title={news.title}
          by={news.by}
          time={news.time}
          id={news.id}
        />
      ))}

      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => <MainPageSkeleton key={i} />)}

      <div ref={observerRef} className="h-10" />
    </div>
  );
}

export default NewsList;
