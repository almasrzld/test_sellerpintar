"use client";

import { Badge } from "@/components/ui/badge";
import useGetArticles from "@/features/Dashboard/Articles/hook/useGetArticles";
import parse from "html-react-parser";
import Image from "next/image";
import useArticlesFeature from "./hook";
import { IArticlesSchema } from "@/features/Dashboard/Articles/schema";
import PaginationSection from "../PaginationSection";

const ListArticlesSection = () => {
  const { page, setPage, limit, value, category } = useArticlesFeature();
  const { data, isLoading } = useGetArticles(category, value, page, limit);

  return (
    <section className="container pt-10">
      <div>
        <p>
          Showing : {data?.data?.length ?? 0} of {data?.total ?? 0} articles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-[60px] pt-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col animate-pulse">
                  <div className="w-full h-60 bg-gray-200 rounded-[12px]" />
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded-full mt-2" />
                  </div>
                </div>
              ))
            : data?.data?.map((item: IArticlesSchema) => (
                <div key={item.id} className="flex flex-col">
                  {item.imageUrl ? (
                    <div className="relative w-full h-60 rounded-[12px] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[240px] bg-gray-200 rounded-[12px]" />
                  )}

                  <div className="mt-4 flex flex-col gap-2">
                    <p className="text-slate-600 font-normal leading-5 text-sm">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <h2 className="text-lg font-semibold leading-7 text-slate-900">
                      {item.title}
                    </h2>

                    <div className="line-clamp-2 text-base font-normal text-slate-600 leading-6">
                      {parse(item.content)}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-200 text-blue-900 rounded-[100px] text-sm font-normal leading-5 py-1 px-3">
                        {item.category?.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {data?.total > limit && (
        <PaginationSection
          page={page}
          setPage={setPage}
          total={data.total}
          limit={limit}
        />
      )}
    </section>
  );
};

export default ListArticlesSection;
