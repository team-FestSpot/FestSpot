import { create } from "zustand";

const useUpperSideBarStore = create((set) => ({
  isMenuOpen: false,
  setOpenDetailMenus: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set(() => ({ isMenuOpen: false })),
}));

export default useUpperSideBarStore;
