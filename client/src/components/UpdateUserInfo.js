import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { UPDATE_USER } from "../utils/mutations";
import Modal from "react-modal";

const UpdateUserInfo = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    password: "",
    linkedin: user.linkedin,
    github: user.github,
    website: user.website,
  });

  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setSelectedProfilePic(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("form state", formState);

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });

      // You may want to handle the update success logic here

      // Close the modal after submission
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateClick = () => {
    // Open the modal when the "Update Info" button is clicked
    setShowModal(true);
  };

  const handleCancelClick = () => {
    // Handle the "Cancel" button click here to close the modal and reset form fields
    setShowModal(false);
    setFormState({
      username: user.username,
      email: user.email,
      password: "",
      linkedin: user.linkedin,
      github: user.github,
      website: user.website,
    });
  };

  return (
    <div>
      <button
        className="background-darkBlue text-white py-2 px-4 rounded hover:background-yellow hover:text-black text-bold flex-1"
        onClick={handleUpdateClick}
      >
        Update Info
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Update User Info Modal"
        className="modal-container modal background-medBlue mt-6" // Apply the styles for the modal
        overlayClassName="overlay" // Apply the styles for the overlay
      >
        <h2 className="text-3xl font-bold text-center mb-4 color-yellow">
          Update User Information
        </h2>
        <form className="mt-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col mb-4">
            <input
              placeholder="UserName"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
            />
            <label
              className="text-white text-lg after:content-['*'] after:ml-0.5 after:text-red-500"
              htmlFor="UserName"
            >
              UserName
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
            />
            <label
              className="text-white text-lg after:content-['*'] after:ml-0.5 after:text-red-500"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <input
              placeholder="******"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
            />
            <label
              className="text-white text-lg after:content-['*'] after:ml-0.5 after:text-red-500"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <input
              placeholder="Linkedin URL"
              name="linkedin"
              type="url"
              id="linkedin"
              value={formState.linkedin}
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
            />
            <label className="text-white text-lg" htmlFor="email">
              Linkedin URL
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <input
              placeholder="Github URL"
              name="github"
              type="url"
              id="github"
              value={formState.github}
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
            />
            <label className="text-white text-lg" htmlFor="github">
              Github URL
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <input
              placeholder="Personal Website"
              name="website"
              type="url"
              id="website"
              value={formState.website}
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2 rounded-md"
            />
            <label className="text-white text-lg" htmlFor="website">
              Personal Website
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
            <label className="text-white text-lg" htmlFor="profilePic">
              Profile Picture
            </label>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="background-yellow text-black py-2 px-4 rounded hover:background-darkBlue hover:text-white text-bold"
              type="submit"
              form="updateForm" // Add the form ID to connect the button with the form
            >
              Save
            </button>
            {/* Add "Cancel" button to close the modal */}
            <button
              className="background-yellow text-black py-2 px-4 rounded hover:background-darkBlue hover:text-white text-bold"
              type="button"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateUserInfo;
