"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";

const EditCategorySchema = z.object({
  name: z.string().optional(),
});

export type IEditCategorySchema = z.infer<typeof EditCategorySchema>;

interface EditCategoryModalProps {
  id: string;
  initialName: string;
}

const EditCategoryModal = ({ id, initialName }: EditCategoryModalProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<IEditCategorySchema>({
    resolver: zodResolver(EditCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IEditCategorySchema) => {
      const response = await axiosInstanceToken.put(
        `/categories/${id}`,
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Updated category");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: initialName });
    }
  }, [open, form, initialName]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-blue-600 text-sm font-normal underline hover:text-blue-400 cursor-pointer p-0 h-auto focus:outline-none"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold leading-7">
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="space-y-8 pt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Category</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Input Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
