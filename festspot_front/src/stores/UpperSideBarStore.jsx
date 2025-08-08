import { create } from "zustand";

const useUpperSideBarStore = create((set) => ({
  isMenuOpen: false,
  setOpenDetailMenus: () => set((prev) => ({ isMenuOpen: !prev.isMenuOpen })),
  closeMenu: () => set(() => ({ isMenuOpen: false })),
}));

export default useUpperSideBarStore;
