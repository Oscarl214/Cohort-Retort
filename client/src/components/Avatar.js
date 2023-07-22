import React from "react";

const Avatar = ({ user }) => {
  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";

  return (
    <div className="w-24 h-24 bg-white color-dkblue rounded-full flex items-center justify-center text-2xl font-bold border">
      {firstName.charAt(0)}
      {lastName.charAt(0)}
    </div>
  );
};

export default Avatar;
