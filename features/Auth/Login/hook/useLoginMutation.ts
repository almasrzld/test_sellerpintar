import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { setToken, setRole } from "@/lib/utils";
import type { ILoginSchema } from "../schema";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (values: ILoginSchema) => {
      const response = await axiosInstanceToken.post("/auth/login", values);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login successful");
      setToken(data.token);
      setRole(data.role);
      console.log(data);
      if (data.role === "User") {
        window.location.href = "/";
      } else {
        window.location.href = "/dashboard";
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export default useLoginMutation;
