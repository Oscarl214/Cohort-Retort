import React, { useEffect, useContext } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostComponents/PostCard";
import { authService } from "../utils/auth"; // Bring in your Auth middleware
import { Link } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const CommunityContainer = () => {
  // const userData = useContext(UserContext);
  // const data = userData?.usersData;

  // if (data === null) return <p className="text-md italic font-semibold text-center ">Please Login if you have an account, or Signup if you don't!</p>;

  const { loading, data, error } = useQuery(QUERY_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data?.user;

  console.log("userDATAincontainer", user);

  return (
    <div className="md:pt-80 lg:pt-80 sm:pt-20 bg-gray-200 top-5 md:top-0 lg:top-0">
      {authService.loggedIn() ? (
        <>
          <div className="md:fixed lg:fixed left-0 right-0 z-50 top-72 min-w-full bg-gray-200">
            <CreatePost />
          </div>
          <div className="lg:pt-24">
            <PostCard />
          </div>
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
