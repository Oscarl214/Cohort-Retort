import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Nav from "./Nav";
import Avatar from "./Avatar";


const Header = (user) => {

  // const { data, loading, error } = useQuery(QUERY_USER);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // console.log("datainheader", data);
  // const username = data.user.username;




  return (
    <>
      <div>
        <Nav />
        <div className="h-32 pt-14 hero relative">
          <div className="flex flex-col items-center justify-center h-32 ">
            <Avatar />
            <h3 className="text-2xl color-dkblue font-bold">Placeholder
              {/* {username} */}
            </h3>
          </div>
        </div>
        <div className="h-24 bg-white"></div>
      </div>
    </>
  );
};

export default Header;
