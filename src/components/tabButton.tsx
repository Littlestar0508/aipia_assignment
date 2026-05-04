import useTabStateStore from '@/utils/TabStateStore';

type TabButtonType = {
  text: string;
  target: string;
};

function TabButton({ text, target }: TabButtonType) {
  const { tabState, setTabState } = useTabStateStore();

  const clickTab = (targetTab: string) => {
    setTabState(targetTab);
  };

  return (
    <>
      <button
        onClick={() => clickTab(target)}
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
