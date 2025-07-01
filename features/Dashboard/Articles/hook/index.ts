"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

const useDashboardArticlesFeature = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 500);
  const [category, setCategory] = useState<string>("");

  return {
    category,
    setCategory,
    search,
    setSearch,
    page,
    setPage,
    limit,
  };
};

export default useDashboardArticlesFeature;
