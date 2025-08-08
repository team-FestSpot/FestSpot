import { create } from "zustand";

export const tempDataStore = create((set) => ({
  listData: {},
  setListData: (data) => set({ listData: data }),
}));
