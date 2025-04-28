import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import axiosInstance from "../../app/axiosConfig";
import { FiExternalLink } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import TechStacksSection from "./techStacksSection";
import CommentSection from "./CommentSection";

function ProjectDetails() {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  // States for project fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [comments, setComments] = useState([]);

  const { data, error, isPending } = useQuery({
    queryKey: ["projectData"],
    queryFn: () =>
      axiosInstance.get(`/project/${id}`).then((res) => {
        return res.data; // <-- THIS IS THE IMPORTANT PART
      }),
  });

  const mutation = useMutation({
    mutationFn: (newCommentContent) => {
      return axiosInstance.post(`/comment/${id}`, {
        content: newCommentContent,
      });
    },
    onSuccess: (response) => {
      const newComment = response.data;
      setComments((prevComments) => [newComment, ...prevComments]);
    },
  });

  // Fill the states when data is available
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
      setLink(data.link);
      setUpdatedAt(data.updatedAt);
      setTechStacks(data.techstack);
      setScreenshots(data.screenshot);
      setComments(data.comment);
    }
  }, [data]);

  // Check if data is fully loaded and ready
  const totalScreenshots = Array.isArray(screenshots) ? screenshots.length : 0;
  const isDataReady =
    !isPending &&
    !error &&
    title &&
    description &&
    Array.isArray(screenshots) &&
    screenshots.length > 0 &&
    Array.isArray(comments) &&
    Array.isArray(techStacks) &&
    techStacks.length > 0;

  if (!isDataReady) {
    return (
      <section className="h-96 w-full flex items-center justify-center">
        <OrbitProgress
          color="#fff"
          size="large"
          text="Loading"
          textColor="#fff"
        />
      </section>
    );
  }

  const formattedDate = new Date(updatedAt).toLocaleDateString("en-GB", {
    dateStyle: "full",
  });

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
    <section className="flex flex-col items-center gap-8 w-10/12 mx-auto min-h-[calc(100vh-56px)] bg-white my-14 rounded-lg shadow-[4px_4px_0px_#000] border-4  border-black p-4">
      <div className="flex items-center justify-around">
        <h1 className="text-purple-800 py-5 px-3 text-4xl font-bold">
          {title}
        </h1>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={`Go to ${link}`}
          className="inline-flex items-center gap-2 text-purple-900 hover:underline"
        >
          <FiExternalLink size={30} />
        </a>
      </div>

      <div className=" w-full h-[80vh] flex items-center justify-center bg-white px-3">
        <div className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
          {totalScreenshots > 1 && (
            <button
              onClick={(e) => prevImage(e)}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 p-3 bg-purple-500 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300"
              disabled={currentIndex === 0}
            >
              &#8249; {/* Left arrow */}
            </button>
          )}

          {screenshots.length > 0 && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={screenshots[currentIndex].url}
              alt={`Screenshot ${screenshots[currentIndex].id}`}
              className="w-full h-full object-contain rounded-lg"
            />
          )}

          {totalScreenshots > 1 && (
            <button
              onClick={(e) => nextImage(e)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 p-3 bg-purple-500 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300"
              disabled={currentIndex === totalScreenshots - 1}
            >
              &#8250; {/* Right arrow */}
            </button>
          )}
        </div>
      </div>
      <div className="space-y-4 my-4 p-10">
        <p className="text-lg text-gray-700">{description}</p>
        <p className="text-md text-gray-600">
          <strong>Work:</strong> {category}
        </p>
        <p className="text-purple-800 text-sm italic">
          Last updated: {formattedDate}
        </p>
      </div>
      <TechStacksSection techStacks={techStacks} />
      <CommentSection comments={comments} createComment={mutation.mutate} />
    </section>
  );
}

export default ProjectDetails;
