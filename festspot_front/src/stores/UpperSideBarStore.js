import { create } from "zustand";

export const useUpperSideBarStore = create((set) => ({
  isMenuOpen: false,
  setOpenDetailMenus: () => set((prev) => ({ isMenuOpen: !prev.isMenuOpen })),
  closeMenu: () => set(() => ({ isMenuOpen: false })),
}));
