"use client";

import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "@/hooks/useAuth";
import UserAvatar from "../common/user-avatar";
import ActionUserMenu from "../common/action-user-menu";
import { useEffect } from "react";

const Navbar = () => {
  const [data, getUser, logoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.logoutHandler])
  );

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-transparent px-[60px] py-9">
      <div className="flex justify-between items-center">
        <div>
          <Image
            src="/images/logo-img.png"
            alt="logo"
            width={134}
            height={24}
            priority
          />
        </div>

        <div className="flex items-center gap-2">
          {data?.username && <UserAvatar username={data.username} />}

          {data && (
            <ActionUserMenu
              data={data}
              logoutHandler={logoutHandler}
              pathName="My Account"
              pathLink="/profile"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
