import React, { useContext } from "react";
import Nav from "./Nav";
import Avatar from "./Avatar";
import { UserContext } from "../utils/userContext";


const Header = (user) => {
  
  const userData = useContext(UserContext);

  console.log("userDATAinHeader",userData.usersData);

  const data = userData.usersData;
  const username = data ? data.username : null


  console.log("datainheader", username);


  return (
    <>
      <div>
        <Nav />
        <div className="h-32 pt-14 hero relative">
          <div className="flex flex-col items-center justify-center h-32 ">
            <Avatar />
            <h3 className="text-2xl color-dkblue font-bold">
              {username ? username: "Welcome to Cohort Retort!"}
            </h3>
          </div>
        </div>
        <div className="h-24 bg-white"></div>
      </div>
    </>
  );
};

export default Header;
