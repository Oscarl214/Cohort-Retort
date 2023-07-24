// import React, { useContext, useEffect } from "react";
// import PostCard from "./PostCard";
// import { useQuery } from "@apollo/client";
// import { UserContext } from "../../utils/userContext";
// import { QUERY_USERS, QUERY_POSTS } from "../../utils/queries";

// const PostViewContainer = () => {
//   // // Fetch all posts using the QUERY_POSTS query
//   // const {
//   //   data: usersData,
//   // } = useQuery(QUERY_POSTS);
//   // const { setUsersData } = useContext(UserContext);
//   // useEffect(() => {
//   //   if (usersData) {
//   //     setUsersData(usersData.users);
//   //   }
//   // }, [usersData, setUsersData]);
//   // console.log("usersData", usersData);

//   // Fetch all users and posts using the QUERY_USERS and QUERY_POSTS queries
//   const { data: usersData } = useQuery(QUERY_USERS);
//   const { data: postsData } = useQuery(QUERY_POSTS);
//   const { setUsersData } = useContext(UserContext);

//   useEffect(() => {
//     if (usersData) {
//       setUsersData(usersData.users);
//     }
//   }, [usersData, setUsersData]);

//   console.log("usersData", usersData);
//   console.log("postsData", postsData);

//   return (
//     <div className="">
//       <PostCard />
//     </div>
//   );
// };

// export default PostViewContainer;
