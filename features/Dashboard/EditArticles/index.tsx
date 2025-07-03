"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditArticleSchema, IEditArticleSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetCategory from "../Category/hook/useGetCategory";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiptapEditor } from "@/components/common/tiptap-editor";
import { useParams, useRouter } from "next/navigation";
import useGetArticlesDetail from "@/features/Base/ArticlesDetail/hook/useGetArticlesDetails";
import useEditArticleMutation from "./hook/useEditArticlesMutation";
import ThumbnailUpdate from "@/components/common/thumbnails-update";

function base64ToFile(base64: string, filename = "preview.png"): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

const DashboardEditArticlesFeature = () => {
  const form = useForm<IEditArticleSchema>({
    resolver: zodResolver(EditArticleSchema),
    defaultValues: {
      image: undefined,
      title: "",
      categoryId: "",
      content: "",
    },
  });

  const router = useRouter();
  const { id } = useParams();
  const { data } = useGetArticlesDetail(id as string);
  const { mutate, isPending } = useEditArticleMutation(id as string);
  const { data: categories } = useGetCategory();
  const [preview, setPreview] = useState<string | null>(null);
  const [hasPreview, setHasPreview] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("article_preview");
    if (stored) {
      const parsed = JSON.parse(stored);
      form.setValue("title", parsed.title);
      form.setValue("categoryId", parsed.categoryId);
      form.setValue("content", parsed.content);

      if (parsed.image?.startsWith("data:image")) {
        const file = base64ToFile(parsed.image);
        form.setValue("image", file);
      } else if (!parsed.image) {
        form.setValue("image", null);
      }

      setPreview(parsed.image);
      setHasPreview(true);
    }
  }, []);

  useEffect(() => {
    if (!hasPreview && data && categories?.data?.length) {
      form.setValue("title", data.title);
      form.setValue("categoryId", data.category.id);
      form.setValue("content", data.content);
      setPreview(data.imageUrl);
    }
  }, [data, categories]);

  return (
    <main>
      <h1 className="flex items-center gap-2 py-5 px-5 text-base font-medium leading-6">
        <button
          onClick={() => {
            localStorage.removeItem("article_preview");
            router.push("/dashboard");
          }}
          className="flex items-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>{" "}
        Edit Articles
      </h1>

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((values) => mutate(values))}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <ThumbnailUpdate
                        preview={preview}
                        onChange={(file) => {
                          form.setValue("image", file);
                          setPreview(file ? URL.createObjectURL(file) : null);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Input title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    {categories?.data?.length ? (
                      <Select
                        key={field.value ?? "empty"}
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.data
                            .filter((cat: any) => !!cat.id)
                            .map((cat: any) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Loading categories...
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-sm font-normal leading-5 pb-6 mt-1 text-slate-500">
              The existing category list can be seen in the{" "}
              <Link
                href="/dashboard/category"
                className="underline-offset-2 underline text-blue-600"
              >
                category
              </Link>{" "}
              menu
            </p>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TiptapEditor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 py-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  localStorage.removeItem("article_preview");
                  router.push("/dashboard");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="bg-slate-200"
                type="button"
                onClick={() => {
                  const values = form.getValues();

                  if (values.image instanceof File) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64Image = reader.result;

                      const previewData = {
                        ...values,
                        image: base64Image,
                        createdAt: new Date().toISOString(),
                        user: { username: "Preview User" },
                      };

                      localStorage.setItem(
                        "article_preview",
                        JSON.stringify(previewData)
                      );
                      window.location.href = "/preview-form";
                    };

                    reader.readAsDataURL(values.image);
                  } else {
                    const previewData = {
                      ...values,
                      image: preview,
                      createdAt: new Date().toISOString(),
                      user: { username: "Preview User" },
                    };

                    localStorage.setItem(
                      "article_preview",
                      JSON.stringify(previewData)
                    );
                    window.location.href = "/preview-form";
                  }
                }}
              >
                Preview
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default DashboardEditArticlesFeature;
