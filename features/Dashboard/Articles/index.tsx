"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategorySchema } from "../Category/schema";
import useGetCategory from "../Category/hook/useGetCategory";
import useArticlesFeature from "@/features/Base/Articles/section/ListArticlesSection/hook";
import { SearchIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import useGetArticles from "./hook/useGetArticles";
import Image from "next/image";
import { IArticlesSchema } from "./schema";
import { format } from "date-fns";
import { PaginationSection } from "@/features/Base/Articles/section";
import { Button } from "@/components/ui/button";

const DashboardArticlesFeature = () => {
  const {
    search,
    setSearch,
    category,
    setCategory,
    page,
    setPage,
    limit,
    value,
  } = useArticlesFeature();
  const { data: dataCategory, isLoading: isLoadingCategory } = useGetCategory();
  const { data, isLoading } = useGetArticles(category, value, page, limit);

  return (
    <main>
      <h1 className="text-base font-medium leading-6 p-6">
        Total Articles : {data?.total ?? 0}
      </h1>
      <div className="py-[26px] px-6 flex justify-between items-center border-y">
        <div className="flex space-x-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[109px] bg-white text-black">
              <SelectValue placeholder="Category" />
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
          <div className="relative w-full md:w-[240px]">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </span>
            <Input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title"
              className="pl-[34px] bg-white text-black"
            />
          </div>
        </div>
        <Link href="/dashboard/articles">
          <Button>
            <Plus /> Add Articles
          </Button>
        </Link>
      </div>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Thumbnails</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-gray-500 italic"
              >
                No articles found.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((item: IArticlesSchema) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.imageUrl ? (
                    <div className="relative w-[60px] h-[60px] mx-auto rounded-[6px] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-[60px] h-[60px] mx-auto rounded-[6px] bg-gray-200" />
                  )}
                </TableCell>
                <TableCell className="text-left truncate">
                  <p className="line-clamp-3 whitespace-normal">{item.title}</p>
                </TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>
                  {format(new Date(item.createdAt), "MMMM dd, yyyy HH:mm:ss")}
                </TableCell>
                <TableCell className="space-x-3">
                  <Link
                    href={`/${item.id}`}
                    className="text-blue-600 underline"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/dashboard/articles/id`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/dashboard/articles/id`}
                    className="text-red-500 underline"
                  >
                    Delete
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {data?.total > limit && (
        <div className="py-6 border-t">
          <PaginationSection
            page={page}
            setPage={setPage}
            total={data.total}
            limit={limit}
          />
        </div>
      )}
    </main>
  );
};

export default DashboardArticlesFeature;
