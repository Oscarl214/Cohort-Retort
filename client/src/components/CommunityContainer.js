import React, { useEffect, useContext } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostComponents/PostCard";
import Auth from "../utils/auth"; // Bring in your Auth middleware
import { Link } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const CommunityContainer = () => {

  // const userData = useContext(UserContext);
  // const data = userData?.usersData;

  // if (data === null) return <p className="text-md italic font-semibold text-center ">Please Login if you have an account, or Signup if you don't!</p>;

  const {loading, data, error} = useQuery(QUERY_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data?.user;

  console.log("userDATAincontainer",user);

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
         <CreatePost/>
          <PostCard />
        </>
      ) : (
        <p>
          You need to be logged in to view and create posts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommunityContainer;
