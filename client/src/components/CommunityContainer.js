import React, { useEffect, useContext } from "react";
import CreatePost from "./CreatePost";
import PostViewContainer from "../components/PostComponents/PostViewContainer";
import PostCard from "./PostComponents/PostCard";
import Auth from "../utils/auth"; // Bring in your Auth middleware
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_POSTS } from "../utils/queries";

const CommunityContainer = () => {
  const { loading, error, data } = useQuery(QUERY_USER);

  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user: {error.message}</p>;

  const user = data?.user;

  console.log("loggedin userdata", user);

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {user ? <CreatePost user={user} /> : null}
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
