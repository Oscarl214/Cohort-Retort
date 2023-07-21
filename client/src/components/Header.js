import React from "react";
import Nav from "./Nav";
import Avatar from "./Avatar";

const Header = ({ user }) => {
  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";
  
  return (
    <>
    <div>
    <Nav/>
      <div className="h-32 pt-14 hero relative">
        
        <div className="flex flex-col items-center justify-center h-32 ">
          <Avatar user={user} />
          <h3 className="text-2xl text-black font-bold">{firstName} {lastName}</h3>
        </div>
      </div>
      <div className="h-24 bg-white"></div>
      </div>
    </>
  );
};

export default Header;
