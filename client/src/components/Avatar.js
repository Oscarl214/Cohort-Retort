import React from "react";

const Avatar = ({ user }) => {
  const firstName = user?.username || "John";

  const profilePicUrl = user.profilePicUrl;

  if (!profilePicUrl) {
    const firstLetter = firstName.charAt(0).toUpperCase();
    return (
      <div className="rounded-full w-36 h-36 bg-gray-200 flex justify-center items-center">
        <span className="color-dkblue text-5xl">{firstLetter}</span>
      </div>
    );
  }

  return (
    <div>
      <img
        class="rounded-full w-36 h-36"
        src={profilePicUrl}
        alt="Extra large avatar"
      />
    </div>
  );
};

export default Avatar;
