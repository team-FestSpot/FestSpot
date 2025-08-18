import { create } from "zustand";

const useAdminAddPerformanceStore = create((set) => ({
  detail: {
    prfnm: "",
    area: "",
    fcltynm: "",
    prfstate: "",
    prfpdfrom: "",
    prfpdto: "",
    prfcast: "",
    visit: "",
    festival: "",
    relates: [],
  },
  setDetail: (id, value) =>
    set((state) => ({ detail: { ...state.detail, [id]: value } })),
  setDetailEmpty: () =>
    set(() => ({
      detail: {
        prfnm: "",
        area: "",
        fcltynm: "",
        prfstate: "",
        prfpdfrom: "",
        prfpdto: "",
        prfcast: "",
        visit: "",
        festival: "",
        relates: [],
      },
    })),
}));

export default useAdminAddPerformanceStore;
