import React from "react";

interface AvatarProps {
  username: string;
}

const UserAvatar: React.FC<AvatarProps> = ({ username }) => {
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-base font-medium leading-6">
      {initial}
    </div>
  );
};

export default UserAvatar;
