import React, { useState } from "react";
import { IRegisterSchema } from "@/features/Auth/Register/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import UserAvatar from "./user-avatar";

interface ActionUserMenuProps {
  data: IRegisterSchema;
  logoutHandler: () => void;
  pathName: string;
  pathLink: string;
  isScrolled?: boolean;
  textClassName?: string;
}

const ActionUserMenu: React.FC<ActionUserMenuProps> = (props) => {
  const { data, logoutHandler, pathName, pathLink, isScrolled, textClassName } =
    props;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none cursor-pointer">
            <div className="flex items-center gap-2">
              <UserAvatar username={data?.username} textClassName="text-base" />
              <div
                className={`text-base font-medium leading-6 underline underline-offset-[3] hidden md:block ${
                  textClassName ?? (isScrolled ? "text-gray-900" : "text-white")
                }`}
              >
                {data?.username}
              </div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="w-[224px] rounded-md border border-border bg-white shadow-md"
        >
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={pathLink}>{pathName}</Link>
          </DropdownMenuItem>
          {data?.role !== "Admin" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenDialog(true)}
                className="text-red-500 focus:text-red-500 gap-2 cursor-pointer"
              >
                <LogOut className="w-2 h-2 text-current" />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
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
              onClick={() => {
                logoutHandler();
                setOpenDialog(false);
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionUserMenu;
