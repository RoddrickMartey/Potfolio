import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Optionally redirect or clear session
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white text-black shadow-sm border-b-2">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
