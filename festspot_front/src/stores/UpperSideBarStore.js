import { create } from "zustand";

const useUpperSideBarStore = create((set) => ({
  openDetailMenus: false,
  setOpenDetailMenus: () =>
    set((state) => ({ openDetailMenus: !state.openDetailMenus })),
  // set((state) => ({ openDetailMenus: !state.openDetailMenus })),
  closeMenu: () => set(() => ({ openDetailMenus: false })),
}));

export default useUpperSideBarStore;
