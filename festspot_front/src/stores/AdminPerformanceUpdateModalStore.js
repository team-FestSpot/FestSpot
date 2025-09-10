import { create } from "zustand";

// 공연 정보 수정 modal 띄우거나 없앨 때 쓰는 zustand 전역상태
// react-modal 쓸거라서 안쓸듯
const useAdminPerformanceUpdateModalStore = create((set) => ({
  isUpdate: false,
  setIsUpdate: () => set(() => ({ isUpdate: true })),
  closeUpdateModal: () => set(() => ({ isUpdate: false })),
}));

export default useAdminPerformanceUpdateModalStore;
