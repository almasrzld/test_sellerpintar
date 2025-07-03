"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface SidebarLogoutButtonProps {
  onLogout: () => void;
}

const SidebarLogoutButton = ({ onLogout }: SidebarLogoutButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex w-full items-center gap-3 py-2 px-4 rounded-[6px] hover:bg-blue-500 text-base font-medium leading-6 text-left text-white hover:text-white/80">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold leading-7">
            Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-normal leading-5">
            Are you sure want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-600 hover:bg-blue-600/90 text-white"
            onClick={onLogout}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SidebarLogoutButton;
