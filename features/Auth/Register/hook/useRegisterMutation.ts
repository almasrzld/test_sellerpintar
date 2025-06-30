import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import type { IRegisterSchema } from "../schema";

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (values: IRegisterSchema) => {
      const response = await axiosInstance.post("/auth/register", values);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
      window.location.href = "/auth/login";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export default useRegisterMutation;
