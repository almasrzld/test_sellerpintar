"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import useGetCategory from "@/features/Dashboard/Category/hook/useGetCategory";
import { ICategorySchema } from "@/features/Dashboard/Category/schema";
import useArticlesFeature from "./ListArticlesSection/hook";
import { useEffect } from "react";
import useGetArticles from "@/features/Dashboard/Articles/hook/useGetArticles";

const HeaderSection = () => {
  const { search, setSearch, category, setCategory } = useArticlesFeature();

  const { data, isLoading } = useGetArticles(category, search, 1, 10);
  const { data: dataCategory, isLoading: isLoadingCategory } = useGetCategory();

  return (
    <section
      className="relative text-center bg-cover bg-center bg-no-repeat h-screen text-white"
      style={{ backgroundImage: "url('/images/hero-img.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#2563EBDB] z-0" />
      <div className="relative z-10 flex flex-col justify-center items-center gap-3 text-center min-h-screen">
        <div className="max-w-[730px] space-y-3">
          <p className="leading-6 font-bold text-sm md:text-base">
            Blog genzet
          </p>
          <h1 className="text-4xl md:text-5xl font-medium leading-12">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <p className="text-xl md:text-2xl font-normal leading-8">
            Your daily dose of design insights!
          </p>
        </div>

        <div className="mt-10 p-2.5 rounded-[12px] bg-blue-500 flex flex-col md:flex-row items-center justify-center gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[180px] bg-white text-black">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingCategory ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) : (
                dataCategory.data
                  .filter(
                    (item: ICategorySchema) => item.id && item.id.trim() !== ""
                  )
                  .map((item: ICategorySchema) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
              )}
            </SelectContent>
          </Select>

          <div className="relative w-full md:w-[400px]">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </span>
            <Input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles"
              className="pl-[34px] bg-white text-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
