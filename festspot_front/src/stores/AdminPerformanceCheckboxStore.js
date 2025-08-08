import { create } from "zustand";

const useAdminPerformanceCheckboxStore = create((set) => ({
  checkedRows: [],
  setCheckedRows: (newCheckedRows) =>
    set((state) => ({ checkedRows: [...newCheckedRows] })),
}));

export default useAdminPerformanceCheckboxStore;
