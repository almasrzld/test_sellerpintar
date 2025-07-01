import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaginationSection = ({
  page,
  setPage,
  total,
  limit,
}: {
  page: number;
  setPage: (value: number) => void;
  total: number;
  limit: number;
}) => {
  const totalPages = Math.ceil(total / limit);

  const getPagesToShow = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      if (totalPages > 1) {
        pages.push("...");
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 pb-[60px] md:pb-[100px]">
      <Button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        variant="ghost"
        className="text-slate-900 text-sm font-medium leading-5"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      {getPagesToShow().map((item, index) =>
        item === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Button
            key={`page-${item}`}
            variant={item === page ? "outline" : "ghost"}
            onClick={() => setPage(item as number)}
            className={`w-8 h-8 p-0 rounded ${
              item === page ? "border border-gray-400 font-semibold" : ""
            }`}
          >
            {item}
          </Button>
        )
      )}

      <Button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        variant="ghost"
        className="text-slate-900 text-sm font-medium leading-5"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default PaginationSection;
