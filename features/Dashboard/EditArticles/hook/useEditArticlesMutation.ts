import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { IEditArticleSchema } from "../schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const updateArticle = async ({
  id,
  values,
}: {
  id: string;
  values: IEditArticleSchema;
}) => {
  let imageUrl: string | undefined;

  if (values.image instanceof File) {
    const formData = new FormData();
    formData.append("image", values.image);

    const uploadResponse = await axiosInstanceToken.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    imageUrl = uploadResponse.data.imageUrl;
  }

  const jsonData = {
    title: values.title,
    content: values.content,
    categoryId: values.categoryId,
    ...(imageUrl !== undefined
      ? { imageUrl }
      : values.image === null
      ? { imageUrl: null }
      : {}),
  };

  const res = await axiosInstanceToken.put(`/articles/${id}`, jsonData);
  return res.data;
};

const useEditArticleMutation = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IEditArticleSchema) => updateArticle({ id, values }),
    onSuccess: (data) => {
      toast.success(data.message || "Updated article");
      localStorage.removeItem("article_preview");

      queryClient.invalidateQueries({ queryKey: ["articles-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });

      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export default useEditArticleMutation;
