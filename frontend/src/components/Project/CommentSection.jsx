import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CommentSection({ comments, createComment }) {
  const [newComment, setNewComment] = useState(""); // State to hold the new comment input

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      createComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6 w-full px-5 mb-10">
      <h3 className="text-2xl font-semibold text-purple-600">Comments</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="px-6 py-2 font-bold text-black bg-white rounded-md shadow-[3px_3px_0px_#000] border-2  border-black"
        >
          Post Comment
        </motion.button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-purple-100 p-4 rounded-md border border-purple-500 shadow-[2px_2px_0px_#9f3fff]"
            >
              <p className="text-gray-950">{comment.content}</p>
              <small className="text-gray-600">
                Posted on {new Date(comment.createdAt).toLocaleString()}
              </small>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CommentSection;
