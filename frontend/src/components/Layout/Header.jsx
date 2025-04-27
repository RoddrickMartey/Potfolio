/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    { name: "home", path: "/", header: "Hey there, welcome!" },
    { name: "about", path: "/about", header: "Wanna know more about me?" },
    {
      name: "projects",
      path: "/projects",
      header: "Check out what I’ve built!",
    },
    { name: "contacts", path: "/contact", header: "Let’s have a chat!" },
  ];

  const currentPage = pages.find((page) =>
    location.pathname.startsWith(page.path)
  );

  return (
    <div className="h-16 flex items-center justify-between px-6 ">
      {/* Header Text */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-wider leading-tight drop-shadow-[3px_3px_0px_#000000]">
          {currentPage?.header || "Hey!"}
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        {pages.map((page) => {
          const isActive =
            page.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(page.path);

          return (
            <motion.button
              key={page.path}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
              onClick={() => navigate(page.path)}
              className={`px-5 py-2 rounded-md font-semibold text-sm uppercase tracking-wide transition-all duration-300 
            ${
              isActive
                ? "bg-white text-black border-2  border-black shadow-[3px_3px_0px_#000000]"
                : "bg-black text-white hover:bg-white border-2 border-purple-800 hover:text-black hover:shadow-[3px_3px_0px_#000000] hover:border-2 hover:border-black"
            }
          `}
            >
              {page.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
