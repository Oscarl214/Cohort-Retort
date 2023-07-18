import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory" className="text-white hover:text-gray-300">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a
              href="/"
              onClick={() => Auth.logout()}
              className="text-white hover:text-gray-300"
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup" className="text-white hover:text-gray-300">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 bg-blue-500 py-4">
      <h1>
        <Link to="/" className="text-white text-xl font-bold">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
