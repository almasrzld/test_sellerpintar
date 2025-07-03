import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import type { ICreateArticleSchema } from "../schema";

const useCreateArticlesMutation = () => {
  return useMutation({
    mutationFn: async (values: ICreateArticleSchema) => {
      const formData = new FormData();
      formData.append("image", values.image);

      const uploadResponse = await axiosInstanceToken.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = uploadResponse.data.imageUrl;
      const response = await axiosInstanceToken.post("/articles", {
        title: values.title,
        content: values.content,
        categoryId: values.categoryId,
        imageUrl,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Upload successful");
      localStorage.removeItem("article_preview");
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export default useCreateArticlesMutation;
