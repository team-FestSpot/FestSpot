import { create } from "zustand";

export const useFixQuillToolBarStore = create((set) => ({
  isFixed: false,
  setIsFixed: (isFix) => set(() => ({ isFixed: isFix })),
}));
