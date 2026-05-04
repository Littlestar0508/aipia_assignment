import { create } from 'zustand';

interface State {
  tabState: string;
}

interface Actions {
  setTabState: (targetTab: string) => void;
}

type Store = State & Actions;

const useTabStateStore = create<Store>((set) => ({
  tabState: 'top',

  setTabState: (targetTab) => {
    set(() => ({
      tabState: targetTab,
    }));
  },
}));

export default useTabStateStore;
