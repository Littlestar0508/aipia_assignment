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

// 무한 스크롤 시 한 번에 불러올 페이지 갯수 설정
const PAGE_SIZE = 10;

// 현재 클릭된 탭 상태에 따른 API 호출 url 변경
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
  // 탭 상태
  const { tabState } = useTabStateStore();

  // 전체 뉴스 id 리스트 상태
  const [storyIds, setStoryIds] = useState<number[]>([]);
  // 렌더링할 뉴스 리스트 상태
  const [currentNewsList, setCurrentNewsList] = useState<CurrentNewsList[]>([]);
  // 현재 페이지(무한 스크롤 기준)
  const [page, setPage] = useState(0);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 에러 상태(ErrorBoundary 전달용)
  const [error, setError] = useState<Error | null>(null);
  // IntersectionObserver 대상 요소
  const observerRef = useRef<HTMLDivElement | null>(null);
  // 중복 fetch 방지용
  const isFetchingRef = useRef(false);

  // 에러 발생한다면 ErrorBoundary로 던지기
  if (error) {
    throw error;
  }

  // 탭 변경 시 id리스트 갱신
  useEffect(() => {
    // 이전 요청 취소용
    const controller = new AbortController();

    const fetchStoryIds = async () => {
      setIsLoading(true);

      // 상태 초기화
      setStoryIds([]);
      setCurrentNewsList([]);
      setPage(0);
      setError(null);

      try {
        const res = await fetch(getNewsListUrl(tabState), {
          signal: controller.signal,
        });

        // HTTP에러 체크
        if (!res.ok) {
          throw new Error('뉴스 ID 목록 호출 실패');
        }

        const ids: number[] = await res.json();
        setStoryIds(ids);
      } catch (error) {
        // Abort 무시(오류 상황이므로)
        if (error instanceof DOMException && error.name === 'AbortError')
          return;

        setError(error instanceof Error ? error : new Error('뉴스 호출 실패'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryIds();

    // 컴포넌트 언마운트
    return () => controller.abort();
  }, [tabState]);

  // id에 따른 뉴스 리스트 가져오기
  useEffect(() => {
    if (storyIds.length === 0) return;

    const controller = new AbortController();

    const fetchNewsItems = async () => {
      // 이미 요청 중이라면 API호출X
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);

      // 현재 페이지에 해당하는 id들 slice
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const currentIds = storyIds.slice(start, end);

      // 만약 더 가져올 데이터가 없으면 종료
      if (currentIds.length === 0) {
        setIsLoading(false);
        isFetchingRef.current = false;
        return;
      }

      try {
        // Promise.all로 뉴스 여러 개 한 번에 가져오기
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

        // 기존 데이터 + 새 데이터 병합
        setCurrentNewsList((prev) => {
          const merged = [...prev, ...newsItems];

          // filter를 통해 기존과 중복된 뉴스 제거
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

  // 무한 스크롤
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 화면에 보이고, 현재 fetch중이 아니라면 다음 페이지 요청
        if (entry.isIntersecting && !isFetchingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      // 완전히 보일 때 Trigger
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-4 flex flex-col gap-4">
      {/* 뉴스 리스트 렌더링 */}
      {currentNewsList.map((news) => (
        <NewsCard
          key={news.id}
          title={news.title}
          by={news.by}
          time={news.time}
          id={news.id}
        />
      ))}

      {/* 로딩 중일때 Skeleton UI로 로딩 중임을 알려주는 UI Feedback */}
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => <MainPageSkeleton key={i} />)}

      {/* 무한 스크롤 감지용 */}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}

export default NewsList;
