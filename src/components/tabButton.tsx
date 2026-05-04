import useTabStateStore from '@/utils/TabStateStore';

type TabButtonType = {
  text: string;
  target: string;
};

function TabButton({ text, target }: TabButtonType) {
  const { setTabState } = useTabStateStore();

  const clickTab = (targetTab: string) => {
    setTabState(targetTab);
  };

  return (
    <>
      <button onClick={() => clickTab(target)}>{text}</button>
    </>
  );
}

export default TabButton;
