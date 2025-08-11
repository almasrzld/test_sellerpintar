"use client";

import { Newspaper, Tag, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/hooks/useAuth";
import ActionUserMenu from "../common/action-user-menu";
import { useShallow } from "zustand/react/shallow";
import SidebarLogoutButton from "../common/sidebar-logout-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Articles");
  const [data, getUser, logoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.logoutHandler])
  );

  useEffect(() => {
    getUser();
  }, [getUser]);

  const SIDEBAR_ITEM = [
    {
      title: "Articles",
      href: "/dashboard",
      icons: Newspaper,
    },
    {
      title: "Category",
      href: "/dashboard/category",
      icons: Tag,
    },
    {
      title: "Logout",
      href: "/auth/login",
      icons: LogOut,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="md:grid min-h-screen w-full md:grid-cols-[267px_1fr]">
      <div className="bg-blue-600 sticky left-0 top-0 h-screen hidden md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/dashboard">
              <Image
                src="/images/logo-white-img.png"
                alt="logo"
                width={134}
                height={24}
                priority
                className="pl-8 py-[30px]"
              />
            </a>

            <nav className="text-white px-4 space-y-2">
              {SIDEBAR_ITEM.map((item) =>
                item.title === "Logout" ? (
                  <SidebarLogoutButton
                    key={item.title}
                    onLogout={logoutHandler}
                  />
                ) : (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setPageTitle(item.title)}
                    className={`flex items-center gap-3 py-2 px-4 rounded-[6px] hover:bg-blue-500 text-base font-medium leading-6 hover:text-white/80 ${
                      pathname === item.href ? "bg-blue-500" : ""
                    }`}
                  >
                    <item.icons className="w-5 h-5" />
                    {item.title}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 flex py-4 items-center justify-between gap-4 border-b bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden p-2 border rounded-lg hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[267px]">
                <VisuallyHidden>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Dashboard navigation menu</SheetDescription>
                </VisuallyHidden>
                <div className="bg-blue-600 h-full">
                  <div className="flex h-full max-h-screen flex-col">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                      <a href="/dashboard">
                        <Image
                          src="/images/logo-white-img.png"
                          alt="logo"
                          width={134}
                          height={24}
                          priority
                          className="pl-8 py-[30px]"
                        />
                      </a>
                      <nav className="text-white px-4 space-y-2">
                        {SIDEBAR_ITEM.map((item) =>
                          item.title === "Logout" ? (
                            <SidebarLogoutButton
                              key={item.title}
                              onLogout={logoutHandler}
                            />
                          ) : (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => {
                                setPageTitle(item.title);
                                setIsOpen(false);
                              }}
                              className={`flex items-center gap-3 py-2 px-4 rounded-[6px] hover:bg-blue-500 text-base font-medium leading-6 hover:text-white/80 ${
                                pathname === item.href ? "bg-blue-500" : ""
                              }`}
                            >
                              <item.icons className="w-5 h-5" />
                              {item.title}
                            </Link>
                          )
                        )}
                      </nav>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="text-lg md:text-xl font-semibold leading-7">
              {pageTitle}
            </h1>
          </div>

          {data && (
            <ActionUserMenu
              data={data}
              logoutHandler={logoutHandler}
              pathName="My Account"
              pathLink="/dashboard/profile"
              textClassName="text-slate-900"
            />
          )}
        </header>

        <main className="p-4 md:p-6 flex-1">
          <div className="w-full min-h-full bg-gray-50 border rounded-[12px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
