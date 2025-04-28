import React, { useState } from "react";
import { Link } from "react-router";

function ProjectsItem({ project }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const totalScreenshots = project.screenshot.length;

  // Function to go to the next image
  const nextImage = () => {
    if (currentIndex < totalScreenshots - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to go to the previous image
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="p-4 border rounded-md bg-white mb-4">
      <div className="my-4">
        <div className="relative">
          {totalScreenshots > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300"
              disabled={currentIndex === 0}
            >
              &#8249; {/* Left arrow */}
            </button>
          )}

          <img
            src={project.screenshot[currentIndex].url}
            alt={`Screenshot ${project.screenshot[currentIndex].id}`}
            className="w-64 h-40 object-cover rounded-md mx-auto"
          />

          {totalScreenshots > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300"
              disabled={currentIndex === totalScreenshots - 1}
            >
              &#8250; {/* Right arrow */}
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
      <p className="font-medium text-gray-700">Category: {project.category}</p>
      <div className="mt-4 flex items-center justify-between">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline bg-gray-200 px-3 py-1"
        >
          Visit Project
        </a>
        <Link
          to={`/update_project/${project.id}`}
          className="text-red-500 hover:underline bg-gray-200 px-3 py-1"
        >
          Edit Project
        </Link>
      </div>
    </div>
  );
}

export default ProjectsItem;
