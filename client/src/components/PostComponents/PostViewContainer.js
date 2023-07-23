import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_POSTS } from "../../utils/queries";
import { UserContext } from "../../utils/userContext";
import PostCard from "./PostCard";
const PostViewContainer = () => {
  // Fetch all posts using the QUERY_POSTS query
  const {
    data: postData,
    loading: userLoading,
    error: userError,
  } = useQuery(QUERY_POSTS);
  const { setPostsData } = useContext(UserContext);
  useEffect(() => {
    if (postData) {
      setPostsData(postData.users);
    }
  }, [postData, setPostsData]);
  console.log("usersData", postData);

  return (
    <div className="">
      <PostCard />
    </div>
  );
};
export default PostViewContainer;
