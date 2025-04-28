/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function ProjectItem({ project, delayTime }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalScreenshots = project.screenshot.length;

  const navigate = useNavigate();

  // Function to go to the next image
  const nextImage = (e) => {
    e.stopPropagation();
    if (currentIndex < totalScreenshots - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to go to the previous image
  const prevImage = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const formattedDate = new Date(project.updatedAt).toLocaleDateString(
    "en-UK",
    {
      dateStyle: "full",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delayTime, ease: "easeInOut", duration: 1 }}
      className="bg-white py-3 px-1 shadow-[5px_5px_0px_#000] border-2 border-black rounded-xl hover:shadow-[5px_5px_0px_#C548E0] hover:border-purple-500 cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="my-4">
        <div className="relative">
          {totalScreenshots > 1 && (
            <button
              onClick={(e) => prevImage(e)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-purple-500 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300"
              disabled={currentIndex === 0}
            >
              &#8249; {/* Left arrow */}
            </button>
          )}

          <img
            src={project.screenshot[currentIndex].url}
            alt={`Screenshot ${project.screenshot[currentIndex].id}`}
            className="w-68 h-40 object-cover rounded-md mx-auto"
          />

          {totalScreenshots > 1 && (
            <button
              onClick={(e) => nextImage(e)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-purple-500 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300"
              disabled={currentIndex === totalScreenshots - 1}
            >
              &#8250; {/* Right arrow */}
            </button>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-purple-800">{project.title}</h3>
        <p className="text-black">{project.description}</p>
        <p className="font-semibold text-purple-600">
          Work: {project.category}
        </p>
        <p className="text-purple-800 text-sm italic">
          Last updated: {formattedDate}
        </p>
        <p className="text-black ">
          Has {project._count.comment} reviews so far
        </p>
        <a
          href={project.link}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-900 hover:underline"
        >
          <FiExternalLink size={18} />
          Visit
        </a>
      </div>
    </motion.div>
  );
}

export default ProjectItem;
