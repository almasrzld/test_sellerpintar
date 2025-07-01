import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = () => Cookies.get("access_token");
export const setToken = (value: string) => Cookies.set("access_token", value);
export const removeToken = () => Cookies.remove("access_token");

export const getRole = () => Cookies.get("access_role");
export const setRole = (role: "Admin" | "User") =>
  Cookies.set("access_role", role);
export const removeRole = () => Cookies.remove("access_role");

export const setUserToLocalStorage = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
