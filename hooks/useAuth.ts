import { create } from "zustand";
import {
  getToken,
  getRole,
  removeToken,
  removeRole,
  removeUserFromLocalStorage,
} from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";

interface AuthState {
  data: any;
  getUser: () => Promise<void>;
  logoutHandler: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  data: null,
  getUser: async () => {
    if (!getToken() || !getRole()) return set({ data: null });

    try {
      const response = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      set({ data: response.data });
    } catch (error) {
      removeToken();
      removeRole();
      removeUserFromLocalStorage();
      set({ data: null });
      window.location.href = "/";
    }
  },

  logoutHandler: async () => {
    removeToken();
    removeRole();
    removeUserFromLocalStorage();
    set({ data: null });
    window.location.href = "/";
  },
}));

export default useAuthStore;
