import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS, USER_BY_ID } from "../../utils/queries";
import CreateComment from "../CreateComment";
import Comment from "../Comment";
import PostHeader from "./PostHeader";

const PostCard = () => {

  const {loading, data, error} = useQuery(QUERY_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  const posts = data?.posts || [];

  console.log("postsData", posts);

  return (
    <div className="">
    {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-lg rounded-xl mx-4 md:mx-auto max-w-md md:max-w-2xl my-6"
        >
          <div className="flex items-start px-4 py-6">
          <PostHeader userId={post.user._id} />
          </div>
          <div className="">
            <div className="pl-20 pr-8">
              <p className="-mt-8 text-slate-400">{post.createdAt}</p>
              <p className="mt-2 color-medblue text-sm">{post.postText}</p>
            </div>

            <div className="">{/* Rest of the component code */}</div>
          </div>
          <div className="pl-20 pr-8 flex items-start mt-6 mb-6">
            <div className="flex mr-2 text-gray-700 text-sm mr-3">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="color-dkblue w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
                {/* Rest of the SVG code */}
              </svg>
              <span>63</span>
            </div>

            <div className="flex mr-2 text-gray-700 text-sm mr-8">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="color-dkblue w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
                {/* Rest of the SVG code */}
              </svg>
              <span>4</span>
            </div>
            <CreateComment postID={post._id} />
            <Comment postID={post._id} />
          </div>
        </div>
      
    ))}
  </div>
 
  );
};

// const UserDetails = ({ userId }) => {
//   const { loading, data, error } = useQuery(USER_BY_ID, {
//     variables: { userId },
//   });

//   if (loading) return <p>Loading user data...</p>;
//   if (error) return <p>Error fetching user data: {error.message}</p>;

//   const user = data?.userById;

//   console.log("UserbyidDetails", user);

//   return (
//     <>
//       {user && (
//         <>
//           <img
//             className="w-12 h-12 rounded-full object-cover mr-4 shadow"
//             src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
//             alt="avatar"
//           />
//           <div>
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900 -mt-1">
//                 {user.username} {user.email}
//                 <a href={user.website}>{user.website}</a>
//               </h2>
//               <small className="text-sm text-gray-700"></small>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

export default PostCard;
