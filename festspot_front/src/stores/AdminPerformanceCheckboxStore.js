import { create } from "zustand";

const useAdminPerformanceCheckboxStore = create((set) => ({
  checkedRows: [],
  setCheckedRows: (newCheckedRows) =>
    set(() => ({ checkedRows: [...newCheckedRows] })),
}));

export default useAdminPerformanceCheckboxStore;
