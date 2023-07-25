import React, { useState, useCallback, useContext, useEffect } from "react";
import { QUERY_POSTS, USER_BY_ID } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_POST } from "../../utils/mutations";
import { UserContext } from "../../utils/userContext";

const PostHeader = ({ userId, postId }) => {
  
  const [showDropdown, setShowDropdown] = useState(false);

  const { usersData } = useContext(UserContext);
  console.log(usersData);

  const handleDropdownToggle = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const { loading, data, error } = useQuery(USER_BY_ID, {
    variables: { userId },
  });

  const [removePost] = useMutation(REMOVE_POST);

  const handleDeletePost = async () => {
    try {
      await removePost({
        variables: { postId }, //passed in PostID from PostCard
        update(cache, { data: { removePost } }) {
          //read current posts
          const { posts } = cache.readQuery({ query: QUERY_POSTS });

          // Filter out the deleted post from the posts array
          const updatedPosts = posts.filter((post) => post._id !== postId);

          // Write the updated posts array back to the cache
          cache.writeQuery({
            query: QUERY_POSTS,
            data: { posts: updatedPosts },
          });
        },
      });

      // Additional logic or UI updates after successful deletion (if needed).
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  const user = data?.userById;

  return (
    <div className="flex items-start px-2 py-4 rounded-t-lg bg-white border-t-4 border-b-0 justify-between">
      <div className="flex items-start">
        <div className="flex flex-col justify-between ml-2">
          <div className="flex items-end justify-between">
            <h2 className="text-l color-dkblue font-bold">{user.username}</h2>
            <div>
              <a
                href={`mailto:${user.email}`}
                className="ml-2 text-gray-500 hover:text-darkBlue"
              >
                <i className="far fa-envelope"></i>
              </a>
              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-500 hover:text-darkBlue"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-500 hover:text-darkBlue"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {usersData === userId && postId && (
          <button
            onClick={handleDropdownToggle}
            className="focus:outline-none"
            aria-label="Dropdown Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="darkBlue"
              viewBox="0 0 24 24"
              className="w-3 h-6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4c1.657 0 3 1.343 3 3 0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3zM12 12c1.657 0 3 1.343 3 3 0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3zM12 20c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
              ></path>
            </svg>
          </button>
        )}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-36 background-medBlue rounded-lg shadow-lg">
            <ul>
              <li>
                <button
                  className="block text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-black font-bold w-full text-left"
                  // onClick={handleEditPost}
                >
                  Edit Post
                </button>
              </li>
              <li>
                <button
                  className="block text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-black font-bold w-full text-left"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
