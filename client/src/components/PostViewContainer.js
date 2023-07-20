import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UserContext } from "../utils/userContext";
import PostCard from "./PostComponents/PostCard";

import { QUERY_POSTS } from "../utils/queries";

const PostViewContainer = () => {
  const { data: userData } = useQuery(QUERY_USER);
  const { setUserData } = useContext(UserContext);

  // Fetch all posts using the QUERY_POSTS query
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(QUERY_POSTS);

  useEffect(() => {
    // Assuming the user data contains the posts array
    setUserData(userData?.user);
    console.log("This is the userData", userData);
  }, [userData, setUserData]);

  console.log("This is the postData", postData);
  return (
    <div className="">
      {/* Render all posts using the PostCard component */}
      {postLoading ? (
        <p>Loading...</p>
      ) : postError ? (
        <p>Error: {postError.message}</p>
      ) : postData?.posts?.length ? (
        postData.posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostViewContainer;
