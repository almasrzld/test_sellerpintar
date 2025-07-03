import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = (value: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["categories", value, page, limit],
    queryFn: async () => {
      console.log("✅ Fetching categories with params:", {
        search: value,
        page,
        limit,
      });
      const response = await axiosInstance.get("/categories", {
        params: {
          page,
          limit,
          search: value,
        },
      });
      return response.data;
    },
  });
};
export default useGetCategory;
