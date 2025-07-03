"use client";

import { useDebounce } from "use-debounce";
import useArticlesStore from "@/hooks/useArticlesFilter";
import { useEffect } from "react";

const useArticlesFeature = (isUser = false) => {
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

  useEffect(() => {
    setLimit(isUser ? 9 : 10);
  }, [isUser, setLimit]);

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
