import TabButton from './tabButton';

function Tab() {
  return (
    <>
      <div className="flex gap-2 font-medium text-2xl">
        <TabButton text={'Top'} target={'top'} />
        <TabButton text={'New'} target={'new'} />
        <TabButton text={'Best'} target={'best'} />
      </div>
    </>
  );
}

export default Tab;
