import React from "react";
import Nav from "./Nav";
import Avatar from "./Avatar";

const Header = ({ user }) => {
  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";
  
  return (
    <>
      <div className="h-32 hero relative">
        <Nav/>
        <div className="flex flex-col items-center justify-center h-32">
          <Avatar user={user} />
          <h3 className="text-black font-bold">{firstName} {lastName}</h3>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
};

export default Header;
