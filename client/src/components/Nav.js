import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex items-center">
          <li className="ml-3">
            <Link
              to="/Profile"
              className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
            >
              Profile
            </Link>
          </li>
          <li className="ml-3">
            <Link
              to="/Home"
              className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
            >
              Home
            </Link>
          </li>
          <li className="ml-3">
            <a
              href="/"
              onClick={() => Auth.logout()}
              className="background-medBlue text-white py-2 px-4 rounded hover:background-yellow hover:text-black text-bold"
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex items-center">
          <li className="ml-3">
            <Link
              to="/signup"
              className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
            >
              Signup
            </Link>
          </li>
          <li className="ml-3">
            <Link
              to="/login"
              className="text-white hover:text-blue-300 px-2 py-1 rounded-lg"
            >
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex items-center justify-between px-5 background-darkBlue py-4">
      <h1>
        <Link to="/" className=" text-2xl font-bold">
          <span style={{ color: "#F0D258" }}>COHORT RETORT</span>
        </Link>
        {/* color work but may want to fix it to use the index.css classname later...or not */}
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
