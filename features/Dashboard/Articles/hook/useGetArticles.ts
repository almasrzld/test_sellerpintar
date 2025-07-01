import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetArticles = (
  category: string,
  value: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["Articles", category, value, page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles", {
        params: {
          page,
          limit,
          title: value,
          category,
        },
      });

      return response.data;
    },
  });
};
export default useGetArticles;
