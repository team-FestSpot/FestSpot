import { create } from "zustand";

// 관리자 메인 페이지 공연 정보 표시하는 data grid에 들어가는 값(rows)을 전역 상태로 만듬
// 검색 기능, 카테고리별 분류, 공연 정보 db에 추가 기능 때문에 만듬
const useAdminPerformanceRowsStore = create((set) => ({
  rows: [],
  setRows: (newRows) => set((state) => ({ rows: [...state.rows, ...newRows] })),
  setRowsEmpty: () => set(() => ({ rows: [] })),
}));

export default useAdminPerformanceRowsStore;
