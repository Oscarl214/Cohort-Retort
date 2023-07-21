import React, { useState } from "react";

const CreateComment = () => {
  const [commentText, setCommentText] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);

  const handleAddCommentClick = () => {
    setShowInputBox(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Implement your logic to create a comment here
    // You can use a mutation to send the commentText to the server
    // and update the comments list for the corresponding post
    // For this example, I'll just clear the input after submitting
    setCommentText("");
    setShowInputBox(false);
  };

  const handleCancelClick = () => {
    setShowInputBox(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setCommentText(value);
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      {showInputBox ? (
        <form onSubmit={handleFormSubmit} className="w-full">
          <textarea
            name="commentText"
            placeholder="Write your comment..."
            value={commentText}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
            onChange={handleChange}
          ></textarea>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="text-bold background-darkBlue text-white py-2 px-4 rounded-lg hover:background-yellow hover:text-black "
            >
              Add Post
            </button>
            <button
              type="button"
              className=" text-bold px-4 py-2 background-medBlue text-white rounded-lg hover:background-yellow hover:text-black"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <button
            className="background-darkBlue text-white py-2 px-4 rounded-lg hover:background-yellow hover:text-black text-bold"
            onClick={handleAddCommentClick}
          >
            Create Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
