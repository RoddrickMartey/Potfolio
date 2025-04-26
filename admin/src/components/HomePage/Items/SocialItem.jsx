import React from "react";
import axiosInstance from "../../../app/axiosConfig";

function SocialItem({ link, fetchUser }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this social link?")) return;

    try {
      await axiosInstance.delete(`/deleteSocial/${link.id}`);
      fetchUser();
    } catch (err) {
      alert("Failed to delete social link.");
    }
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded mb-2">
      <div>
        <p className="font-semibold">{link.platform}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {link.url}
        </a>
      </div>
      <button
        onClick={handleDelete}
        className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default SocialItem;
