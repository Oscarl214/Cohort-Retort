import React, { useContext, useState, useCallback } from "react";
import { UserContext } from "../../utils/userContext";

const PostHeader = (props) => {
  const { usersData } = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const handleEditPost = useCallback(() => {
    // Insert logic for editing post here
  }, []);

  const handleDeletePost = useCallback(() => {
    // Insert logic for deleting post here
  }, []);

  if (!usersData) {
    return <p>Loading...</p>;
  }

  const userPost = usersData.find((user) =>
    user.posts.some((post) => post._id === props.postID)
  );

  const firstName = userPost?.firstName || "";
  const lastName = userPost?.lastName || "";
  const email = userPost?.email || "";

  if (!firstName || !lastName || !email) {
    return <p>User not found.</p>;
  }

  return (
    <div className="flex items-start px-2 py-4 rounded-t-lg bg-white border-t-4 border-b-0 justify-between">
      <div className="flex items-start">
        <div className="flex flex-col justify-between ml-2">
          <div className="flex items-end justify-between">
            <h2 className="text-l color-dkblue font-bold">
              {firstName} {lastName}
            </h2>
            <div>
              <a href={`mailto:${email}`} className="ml-2 text-gray-500 hover:text-darkBlue">
                <i className="far fa-envelope"></i>
              </a>
              {userPost.linkedin && (
                <a
                  href={userPost.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-500 hover:text-darkBlue"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {userPost.github && (
                <a
                  href={userPost.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-500 hover:text-darkBlue"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
            </div>
          </div>
          <small className="text-sm text-gray-700 mt-1">{props.createdAt}</small>
        </div>
      </div>
      <div className="relative">
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
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-36 background-medBlue rounded-lg shadow-lg">
            <ul>
              <li>
                <button
                  className="block text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-black font-bold w-full text-left"
                  onClick={handleEditPost}
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
