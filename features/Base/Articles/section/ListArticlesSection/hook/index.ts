"use client";

import { useDebounce } from "use-debounce";
import useArticlesStore from "@/hooks/useArticlesFilter";

const useArticlesFeature = () => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    category,
    setCategory,
  } = useArticlesStore();
  const [value] = useDebounce(search, 500);

  return {
    page,
    setPage,
    limit,
    search,
    setSearch,
    value,
    category,
    setCategory,
  };
};

export default useArticlesFeature;
