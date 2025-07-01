import { create } from "zustand";

interface ArticlesState {
  page: number;
  limit: number;
  search: string;
  category: string;
  setPage: (val: number) => void;
  setLimit: (val: number) => void;
  setSearch: (val: string) => void;
  setCategory: (val: string) => void;
}

const useArticlesStore = create<ArticlesState>((set) => ({
  page: 1,
  limit: 9,
  search: "",
  category: "",
  setPage: (val) => set({ page: val }),
  setLimit: (val) => set({ limit: val }),
  setSearch: (val) => set({ search: val }),
  setCategory: (val) => set({ category: val }),
}));

export default useArticlesStore;
