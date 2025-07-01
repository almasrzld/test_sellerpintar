import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
  });
};
export default useGetCategory;
