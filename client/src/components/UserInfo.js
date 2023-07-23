import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import PostHeader from "./PostComponents/PostHeader";
import CreateComment from "../components/CreateComment";
import Comment from "../components/Comment";

const UserInfo = () => {
  const { data, loading, error } = useQuery(QUERY_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { user } = data;
  const { posts } = user;

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-auto grid md:grid-cols-2 gap-4">
        {/* User Information */}
        <div className="bg-gray rounded-lg flex justify-center pt-20 max-h-96">
          <div className="bg-white rounded-[5rem] max-w-2xl container relative py-10">
            <p className="text-blue-900 text-center text-3xl font-bold">
              {user.firstName} {user.lastName}
            </p>
            
            <p className="text-blue-900 text-center">
              <strong>Email:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.email}</p>
            
            <p className="text-blue-900 text-center">
              <strong>Website:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.website}</p>
           
            <p className="text-blue-900 text-center">
              <strong>LinkedIn:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.linkedin}</p>
            
            <p className="text-blue-900 text-center">
              <strong>GitHub:</strong>
            </p>
            <p className="text-gray-700 text-center">{user.github}</p>
          </div>
        </div>

        {/* Posts */}
        <div className="p-20">
          {user.posts.map((post) => (
            <div key={post._id} className="bg-white shadow-lg rounded-xl mx-4 md:mx-auto max-w-md md:max-w-2xl my-6">
              <PostHeader postID={post._id} />
              <div className="pl-20 pr-8">
                <p className="-mt-8 text-slate-400">{post.createdAt}</p>
                <p className="mt-2 color-medblue text-sm">{post.postText}</p>
              </div>

              <div className="pl-20 pr-8 flex items-start mt-6 mb-6">
                <div className="flex mr-2 text-gray-700 text-sm mr-3">
                  <svg fill="none" viewBox="0 0 24 24" className="color-dkblue w-4 h-4 mr-1" stroke="currentColor">
                    {/* Rest of the SVG code */}
                  </svg>
                  <span>63</span>
                </div>

                <div className="flex mr-2 text-gray-700 text-sm mr-8">
                  <svg fill="none" viewBox="0 0 24 24" className="color-dkblue w-4 h-4 mr-1" stroke="currentColor">
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
      </div>
    </div>
  );
};

export default UserInfo;

