import useTabStateStore from '@/utils/TabStateStore';

type TabButtonProps = {
  text: string;
  target: string;
};

// 부모에게서 실제로 보일 텍스트와 상태로 등록할 텍스트 설정
function TabButton({ text, target }: TabButtonProps) {
  const { tabState, setTabState } = useTabStateStore();

  // 탭 클릭 시 tabState 변경(Zustand 상태 공유)
  const clickTab = (targetTab: string) => {
    setTabState(targetTab);
  };

  return (
    <>
      <button
        onClick={() => clickTab(target)}
        // tabState에 따라 스타일링 변화
        className={`${
          tabState === target
            ? 'font-bold text-blue-600 border-b border-blue-600'
            : 'text-gray-400'
        } hover:bg-gray-300 active:bg-gray-300 p-4 rounded-t-xl`}
      >
        {text}
      </button>
    </>
  );
}

export default TabButton;
