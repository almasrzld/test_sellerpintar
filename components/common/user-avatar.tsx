import React from "react";

interface AvatarProps {
  username: string;
  className?: string;
  textClassName?: string;
}

const UserAvatar: React.FC<AvatarProps> = ({
  username,
  className = "",
  textClassName = "",
}) => {
  const initial = username.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`w-8 h-8 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center ${className}`}
    >
      <span className={`font-medium leading-6 ${textClassName}`}>
        {initial}
      </span>
    </div>
  );
};

export default UserAvatar;
