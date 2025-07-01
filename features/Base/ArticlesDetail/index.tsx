"use client";

import Image from "next/image";
import useGetArticlesDetail from "./hook/useGetArticlesDetails";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import useGetOtherArticles from "./hook/useGetOtherArticles";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IArticlesSchema } from "@/features/Dashboard/Articles/schema";
import SkeletonArticlesDetail from "@/components/common/skeleton-articles-detail";

const ArticlesDetailFeature = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetArticlesDetail(id as string);

  const { data: otherArticles, isLoading: isOtherArticlesLoading } =
    useGetOtherArticles(id as string);

  if (isLoading) {
    return <SkeletonArticlesDetail />;
  }

  return (
    <main className="container pt-[136px]">
      <section>
        <p className="text-center text-sm font-medium leading-5">
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          <span className="mx-2">&middot;</span> Created by {data.user.username}
        </p>

        <h1 className="mx-auto text-center pt-4 pb-10 text-3xl font-semibold leading-9 max-w-2xl">
          {data.title}
        </h1>

        <div className="relative w-full h-[300px] md:h-[480px] rounded-[12px] overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <div className="space-y-4 pt-10 pb-10">{parse(data.content)}</div>
      </section>

      <section className="pt-10 pb-[100px] px-4">
        <h2 className="pb-6 text-xl font-bold leading-7">Other articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-[60px]">
          {isOtherArticlesLoading
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
            : otherArticles?.data.map((item: IArticlesSchema) => (
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

                    <Link href={`/${item.id}`}>
                      <h2 className="text-lg font-semibold leading-7 text-slate-900">
                        {item.title}
                      </h2>
                    </Link>

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
      </section>
    </main>
  );
};

export default ArticlesDetailFeature;
