import React from "react";
import { Link, useLocation } from "react-router";

function NavComponent() {
  const { pathname } = useLocation(); // Get the current path

  // Define the object mapping pathnames to navigation names
  const navLinks = {
    "/userInfo": "User Info",

    "/projects": "Projects",
    "/update_user_info": "Update User Info",
  };

  return (
    <nav className="w-full">
      <ul className="space-y-2">
        {Object.entries(navLinks).map(([path, label]) => (
          <li key={path}>
            <Link
              to={path}
              className={`block px-4 py-3 transition duration-200 text-lg ${
                pathname === path
                  ? "bg-gray-200 text-black font-semibold"
                  : "bg-black text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavComponent;
