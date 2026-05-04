// src/components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-75 flex-col items-center justify-center gap-4 text-center">
          <p className="text-lg font-semibold">
            뉴스를 불러오는 과정에서 오류가 발생했습니다.
          </p>
          <p className="text-sm text-gray-500">
            새로고침을 통해 다시 로딩해주시기 바랍니다.
          </p>

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

    return this.props.children;
  }
}

export default ErrorBoundary;
