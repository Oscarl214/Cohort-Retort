import React, {useEffect, useContext} from "react";
import CreatePost from "./CreatePost";
import PostViewContainer from "../components/PostComponents/PostViewContainer";
import Auth from "../utils/auth"; // Bring in your Auth middleware
import { Link } from "react-router-dom";

const CommunityContainer = () => {
  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <CreatePost />
          <PostViewContainer />
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
