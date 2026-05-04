import { Component, type ReactNode } from 'react';

// children을 받아서 감싸는 역할
type Props = {
  children: ReactNode;
};

// 에러 발생 여부를 상태로 관리
type State = {
  hasError: boolean;
};

// 클래스 컴포넌트로 작성해야 ErrorBoundary 사용 가능
class ErrorBoundary extends Component<Props, State> {
  // 초기 상태: 에러 없음
  state: State = {
    hasError: false,
  };

  // 렌더링 과정에서 에러가 발생하면 호출됨
  // 여기서 true를 반환하면 fallback UI로 전환됨
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    // 에러가 발생했을 경우 fallback UI 렌더링
    if (this.state.hasError) {
      return (
        <div className="flex min-h-75 flex-col items-center justify-center gap-4 text-center">
          <p className="text-lg font-semibold">
            뉴스를 불러오는 과정에서 오류가 발생했습니다.
          </p>
          <p className="text-sm text-gray-500">
            새로고침을 통해 다시 로딩해주시기 바랍니다.
          </p>

          {/* 새로고침 버튼 -> 전체 페이지 리로드 */}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white active:scale-95"
          >
            새로고침
          </button>
        </div>
      );
    }

    // 에러가 없으면 정상적으로 자식 컴포넌트 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;
