"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

const useDashboardCategoryFeature = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 500);

  return {
    page,
    setPage,
    limit,
    search,
    setSearch,
    value,
  };
};

export default useDashboardCategoryFeature;
