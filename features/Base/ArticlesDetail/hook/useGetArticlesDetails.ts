import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetArticlesDetail = (id: string) => {
  return useQuery({
    queryKey: ["articles-detail", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/articles/${id}`);
      return response.data;
    },
  });
};
export default useGetArticlesDetail;
