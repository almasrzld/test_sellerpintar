"use client";

import { ICategorySchema } from "../Category/schema";
import useGetCategory from "../Category/hook/useGetCategory";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddCategoryModal from "@/components/common/add-category-modal";
import { format } from "date-fns";
import { PaginationSection } from "@/features/Base/Articles/section";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import useDeleteCategoryMutation from "./hook/useDeleteCategoryById";
import useDashboardCategoryFeature from "./hook";
import EditCategoryModal from "@/components/common/edit-category-modal";

const DashboardCategoryFeature = () => {
  const { search, setSearch, page, setPage, limit, value } =
    useDashboardCategoryFeature();
  const { data, isLoading } = useGetCategory(value, page, limit);
  const { mutate, isPending: isLoadingDelete } = useDeleteCategoryMutation();

  return (
    <main className="overflow-x-hidden">
      <h1 className="text-base font-medium leading-6 p-6">
        Total Category : {data?.totalData ?? 0}
      </h1>
      <div className="py-[26px] px-6 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center border-y">
        <div className="relative w-full md:w-[240px]">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <SearchIcon className="w-4 h-4 text-gray-500" />
          </span>
          <Input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Category"
            className="pl-[34px] bg-white text-black"
          />
        </div>

        <AddCategoryModal />
      </div>
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[375px]">Category</TableHead>
              <TableHead className="w-[375px]">Created at</TableHead>
              <TableHead className="w-[375px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-4 text-gray-500 italic"
                >
                  No articles found.
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item: ICategorySchema) => (
                <TableRow key={item.id}>
                  <TableCell className="w-[375px]">{item.name}</TableCell>
                  <TableCell className="w-[375px]">
                    {format(new Date(item.createdAt), "MMMM dd, yyyy HH:mm:ss")}
                  </TableCell>
                  <TableCell className="flex mx-auto justify-center items-center gap-3 w-[375px]">
                    <EditCategoryModal id={item.id} initialName={item.name} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-red-500 underline hover:text-red-600 cursor-pointer p-0 h-auto"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-lg font-semibold leading-7">
                            Delete Category
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-sm font-normal leading-5">
                            Delete category “{item.name}”? This will remove it
                            from master data permanently.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isLoadingDelete}
                            onClick={() => mutate(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            {isLoadingDelete ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {data?.totalData > limit && (
        <div className="py-6 border-t">
          <PaginationSection
            page={page}
            setPage={setPage}
            total={data.totalData}
            limit={limit}
          />
        </div>
      )}
    </main>
  );
};

export default DashboardCategoryFeature;
