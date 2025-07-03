"use client";

import { Newspaper, Tag, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/hooks/useAuth";
import UserAvatar from "../common/user-avatar";
import ActionUserMenu from "../common/action-user-menu";
import { useShallow } from "zustand/react/shallow";
import SidebarLogoutButton from "../common/sidebar-logout-button";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
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
    <div className="grid min-h-screen w-full grid-cols-[267px_1fr]">
      <div className="bg-blue-600 sticky left-0 top-0 h-screen">
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

      <div className="flex flex-col h-screen">
        <div>
          <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-4 border-b bg-white px-6">
            <h1 className="text-xl font-semibold leading-7">{pageTitle}</h1>
            <div className="flex items-center gap-2">
              {data && (
                <UserAvatar
                  username={data.username}
                  textClassName="text-base"
                />
              )}

              <div className="hidden md:block">
                {data && (
                  <ActionUserMenu
                    data={data}
                    logoutHandler={logoutHandler}
                    pathName="My Account"
                    pathLink="/dashboard/profile"
                    textClassName="text-slate-900"
                  />
                )}
              </div>
            </div>
          </header>
        </div>
        <main className="p-6 overflow-auto flex-1">
          <div className="w-full min-h-full bg-gray-50 border rounded-[12px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
