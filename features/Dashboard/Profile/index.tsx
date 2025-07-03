"use client";

import UserAvatar from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { getUserFromLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";

const DashboardProfileFeature = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-[400px] py-6 px-4">
        <h1 className="text-xl font-semibold leading-7 text-center">
          User Profil
        </h1>
        <div className="py-9">
          <div className="flex items-center justify-center">
            <UserAvatar
              username={user.username}
              className="w-16 h-16"
              textClassName="text-2xl font-medium leading-8"
            />
          </div>
          <div className="w-full space-y-3 pt-6">
            <div className="grid grid-cols-[90px_10px_1fr] gap-2 bg-gray-100 py-2.5 px-3 rounded-[6px] border">
              <span className="font-semibold text-base leading-6">
                Username
              </span>
              <span>:</span>
              <span className="text-center">{user.username}</span>
            </div>
            <div className="grid grid-cols-[90px_10px_1fr] gap-2 bg-gray-100 py-2.5 px-3 rounded-[6px] border">
              <span className="font-semibold text-base leading-6">
                Password
              </span>
              <span>:</span>
              <span className="text-center">{user.password}</span>
            </div>
            <div className="grid grid-cols-[90px_10px_1fr] gap-2 bg-gray-100 py-2.5 px-3 rounded-[6px] border">
              <span className="font-semibold text-base leading-6">Role</span>
              <span>:</span>
              <span className="text-center">{user.role}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full"
        >
          Back to dashboard
        </Button>
      </div>
    </main>
  );
};

export default DashboardProfileFeature;
