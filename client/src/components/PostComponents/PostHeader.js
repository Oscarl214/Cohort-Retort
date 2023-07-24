import React from "react";
import { useQuery } from "@apollo/client";
import { USER_BY_ID } from "../../utils/queries";

const PostHeader = ({ userId }) => {
  const { loading, data, error } = useQuery(USER_BY_ID, {
    variables: { userId },
  });

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  const user = data?.userById;

  console.log("UserbyidDetails", user);

  return (
    <>
      {user && (
        <>
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
          />
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                {user.username} {user.email}
                <a href={user.website}>{user.website}</a>
              </h2>
              <small className="text-sm text-gray-700"></small>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostHeader;