import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetOtherArticles = (id: string) => {
  return useQuery({
    queryKey: ["other-articles", id],
    queryFn: async () => {
      const response = await axiosInstance.get("/articles");
      const filtered = response.data.data.filter(
        (article: any) => article.id !== id
      );
      return { data: filtered.slice(0, 3) };
    },
    enabled: !!id,
  });
};

export default useGetOtherArticles;
