import { create } from "zustand";

// 공연 정보 수정하기 버튼 눌러서 modal창 떴을 때 표시할 공연 정보 담는 zustand 전역상태
const useAdminPerformanceUpdateStore = create((set) => ({
  performanceToUpdate: {},
  setPerformanceToUpdate: (row) =>
    set((state) => ({
      performanceToUpdate: {
        ...state.performanceToUpdate,
        ...row,
      },
    })),
  resetPerformanceToUpdate: () =>
    set((state) => ({
      performanceToUpdate: {},
    })),
}));

export default useAdminPerformanceUpdateStore;
