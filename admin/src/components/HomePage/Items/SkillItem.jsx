import React, { useState } from "react";
import { FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import axiosInstance from "../../../app/axiosConfig";

function SkillItem({ skill, fetchUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkill, setEditedSkill] = useState(skill.skill);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/deleteSkill/${skill.id}`);

      fetchUser(); // Refresh the list
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!window.confirm("Save changes to this skill?")) return;

    try {
      setLoading(true);
      const res = await axiosInstance.patch(`/updateSkill/${skill.id}`, {
        skill: editedSkill,
      });

      setIsEditing(false);
      fetchUser(); // Refresh the list
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setEditedSkill(skill.skill);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border border-gray-300 rounded-md mb-2 bg-gray-50 hover:bg-gray-100">
      {isEditing ? (
        <input
          type="text"
          value={editedSkill}
          onChange={(e) => setEditedSkill(e.target.value)}
          className="flex-grow p-1 mr-2 border border-gray-300 rounded"
          disabled={loading}
        />
      ) : (
        <p className="flex-grow">{skill.skill}</p>
      )}

      <div className="flex space-x-3 ml-2 text-gray-600">
        {isEditing ? (
          <>
            <button onClick={handleSave} title="Save" disabled={loading}>
              <FiCheck className="hover:text-green-600" />
            </button>
            <button onClick={handleDiscard} title="Discard" disabled={loading}>
              <FiX className="hover:text-red-600" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} title="Edit">
              <FiEdit className="hover:text-blue-600" />
            </button>
            <button onClick={handleDelete} title="Delete" disabled={loading}>
              <FiTrash className="hover:text-red-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SkillItem;
