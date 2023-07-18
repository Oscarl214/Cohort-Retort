import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
      <div className="container w-full max-w-sm bg-blue-100 p-6 rounded-lg">
        <form onSubmit={handleFormSubmit} className="mt-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg text-black-500">
              Email address:
            </label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="pwd" className="text-lg">
              Password:
            </label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="border border-blue-300 p-2 mt-2"
            />
          </div>
          {error ? (
            <div>
              <p className="text-red-500">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <div>
              <Link
                to="/signup"
                className="bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-600 border border-black-500 ml-4"
              >
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
