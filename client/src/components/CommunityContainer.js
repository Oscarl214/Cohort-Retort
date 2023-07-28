import React from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostComponents/PostCard";
import Auth from "../utils/auth"; // Bring in your Auth middleware
import { Link } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

const CommunityContainer = () => {

  const {loading, data, error} = useQuery(QUERY_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className="md:pt-80 lg:pt-80 sm:pt-20 bg-gray-200 top-5 md:top-0 lg:top-0">
      {Auth.loggedIn() ? (
        <>
         <div className="md:fixed lg:fixed left-0 right-0 z-50 top-72 min-w-full bg-gray-200">
          <CreatePost /></div>
          <div className="lg:pt-24"><PostCard /></div>
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
