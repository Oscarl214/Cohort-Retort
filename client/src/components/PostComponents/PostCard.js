import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import PostHeader from "./PostHeader";
import CreateComment from "../CreateComment";
import Comment from "../Comment";


const PostCard = () => {
// Fetch all posts using the QUERY_POSTS query
const { data, loading, error } = useQuery(QUERY_POSTS);


if (loading) {
return <p>Loading...</p>;
}


if (error) {
return <p>Error: {error.message}</p>;
}


const posts = data.posts || [];
  
console.log("Posts Array:", posts);


  return (
    <div className="flex bg-white shadow-lg rounded-xl mx-4 md:mx-auto max-w-md md:max-w-2xl my-6 " >
      {posts.map((post) => (
        <>
        <div className="">
         <PostHeader postID={post._id} />
          <div key={post._id} className="">
            <div className="pl-20 pr-8">
              <p className="-mt-8 text-slate-400">{post.createdAt}</p>
              <p className="mt-2 color-medblue text-sm">{post.postText}</p>fs
            </div>


            <div className="">
            {/* Rest of the component code */}
          </div>
        </div>
            <div className="pl-20 pr-8 flex items-start mt-6 mb-6">
              <div className="flex mr-2 text-gray-700 text-sm mr-3">

                <svg fill="none" viewBox="0 0 24 24" class="color-dkblue w-4 h-4 mr-1" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          {/* Rest of the SVG code */}
                </svg>
              <span>63</span>
            </div>

          <div className="flex mr-2 text-gray-700 text-sm mr-8">
                <svg fill="none" viewBox="0 0 24 24" class="color-dkblue w-4 h-4 mr-1" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                {/* Rest of the SVG code */}
                </svg>
              <span>4</span>
          </div>

          <CreateComment postID={post._id}/>
          <Comment />

          </div>
        </div>
    </div>
  </>
  ))}
</div>
);
};


export default PostCard;
