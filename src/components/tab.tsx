import TabButton from './tabButton';

function Tab() {
  return (
    <>
      <div className="flex gap-8 font-medium text-2xl border-b box-border border-gray-300">
        <TabButton text={'Top'} target={'top'} />
        <TabButton text={'New'} target={'new'} />
        <TabButton text={'Best'} target={'best'} />
      </div>
    </>
  );
}

export default Tab;
