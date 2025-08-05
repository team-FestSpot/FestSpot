import { create } from "zustand";

// 관리자 페이지에서 공연 정보 수정 modal 띄우거나 없앨 때 쓰는 zustand 전역상태
const useAdminPerformanceUpdateModalStore = create((set) => ({
  isUpdate: false,
  setIsUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
  closeUpdateModal: () => set(() => ({ isUpdate: false })),
}));

export default useAdminPerformanceUpdateModalStore;
