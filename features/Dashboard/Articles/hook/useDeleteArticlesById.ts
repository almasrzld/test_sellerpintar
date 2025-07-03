"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";

const useDeleteArticlesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstanceToken.delete(`/articles/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete article");
    },
  });
};

export default useDeleteArticlesMutation;
