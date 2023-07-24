import React, { useEffect, useContext } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostComponents/PostCard";
import Auth from "../utils/auth"; // Bring in your Auth middleware
import { Link } from "react-router-dom";
import { UserContext } from "../utils/userContext";

const CommunityContainer = () => {

  const userData = useContext(UserContext);
  const data = userData?.usersData;

  if (data === null) return <p className="text-md italic font-semibold text-center ">Please Login if you have an account, or Signup if you don't!</p>;


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
