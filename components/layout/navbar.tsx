"use client";

import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "@/hooks/useAuth";
import UserAvatar from "../common/user-avatar";
import ActionUserMenu from "../common/action-user-menu";
import { useEffect, useState } from "react";
import useMediaQuery from "../common/media-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [data, getUser, logoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.logoutHandler])
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isDarkUsername = pathname === "/" && !isScrolled;
  const textClassName = isDarkUsername ? "text-white" : "text-slate-900";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const logoSrc =
    pathname === "/" && !isScrolled && isDesktop
      ? "/images/logo-white-img.png"
      : "/images/logo-img.png";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-[60px] py-[21px] md:py-9 transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b border-slate-200"
          : "bg-white md:bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src={logoSrc} alt="logo" width={134} height={24} priority />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {data && (
            <UserAvatar username={data.username} textClassName="text-base" />
          )}

          <div className="hidden md:block">
            {data && (
              <ActionUserMenu
                data={data}
                logoutHandler={logoutHandler}
                pathName="My Account"
                pathLink="/profile"
                isScrolled={isScrolled}
                textClassName={textClassName}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
