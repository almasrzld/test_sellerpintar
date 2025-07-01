"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { CategorySchema, ICategorySchema } from "../schema";

const useDashboardCategoryFeature = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [value] = useDebounce(search, 500);
  const [location, setLocation] = useState<string>("");

  return {
    page,
    setPage,
    limit,
    search,
    setSearch,
    value,
    location,
    setLocation,
  };
};

export default useDashboardCategoryFeature;
