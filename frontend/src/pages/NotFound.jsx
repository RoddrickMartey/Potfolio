/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaSadTear } from "react-icons/fa"; // Sad face icon from react-icons

function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-purple-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 text-center"
      >
        {/* Sad Face Icon */}
        <FaSadTear className="text-white text-6xl drop-shadow-[3px_3px_0px_#000]" />

        {/* Not Found Text */}
        <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_#000]">
          404 - Page Not Found
        </h1>

        {/* Optional small message */}
        <p className="text-white/80 text-lg">
          Sorry, the page you're looking for doesn't exist.
        </p>
      </motion.div>
    </section>
  );
}

export default NotFound;
