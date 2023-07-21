import React, { useContext } from "react";
import { UserContext } from "../../utils/userContext";
import { useState, useEffect } from "react";

const PostHeader = (props) => {
  const { usersData } = useContext(UserContext);

  console.log("usersData", usersData);
  console.log("postID", props.postID);

  if (!usersData) {
    return <p>Loading...</p>;
  }

  const userInfo = usersData.find((user) => user.posts.includes(props.postID));

  const userInfo2 = usersData.map();

  console.log("userInfo", userInfo);

  //   console.log("This is key", props.postID);
  // Map through the posts array to render each post card
  return (
    <div>
      {
        <div className="flex items-start px-4 py-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
          />
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <small className="text-sm text-gray-700">{userInfo.email}</small>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PostHeader;
