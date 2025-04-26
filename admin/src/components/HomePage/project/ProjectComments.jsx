import React from "react";
import { FaTrash } from "react-icons/fa"; // Importing the delete icon from react-icons
import axiosInstance from "../../../app/axiosConfig";

function ProjectComments({ comments, fetchProject }) {
  console.log(comments);

  // Placeholder function for delete action
  const handleDelete = async (commentId) => {
    console.log(`Delete comment with ID: ${commentId}`);
    await axiosInstance.delete(`/deleteComment/${commentId}`);
    fetchProject();
    // You can implement the actual delete logic here
  };

  return (
    <div className="my-4">
      <h3 className="font-semibold text-lg">Comments</h3>
      {comments && comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="border-b p-2 flex justify-between">
              <div>
                <p className="font-medium">{comment.content}</p>
                <small className="text-gray-500">
                  Posted on {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
              <button
                onClick={() => handleDelete(comment.id)} // Call handleDelete when clicked
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default ProjectComments;
