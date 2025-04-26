import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import axiosInstance from "../../../app/axiosConfig";

function PhoneItem({ phone, fetchUser }) {
  const [editing, setEditing] = useState(false);
  const [number, setNumber] = useState(phone.number);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this number?"
    );
    if (!confirm) return;
    try {
      await axiosInstance.delete(`/deletePhoneNumber/${phone.id}`);
      fetchUser();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSave = async () => {
    const confirm = window.confirm("Save changes to this number?");
    if (!confirm) return;
    try {
      setSubmitting(true);
      await axiosInstance.patch(`/updatePhoneNumber/${phone.id}`, { number });
      setEditing(false);
      fetchUser();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-between border p-2 rounded-md bg-gray-50 mb-2">
      {editing ? (
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border px-2 py-1 rounded-md flex-1 mr-2"
          disabled={submitting}
        />
      ) : (
        <p className="flex-1">{phone.number}</p>
      )}
      <div className="flex space-x-2 text-gray-600">
        {editing ? (
          <>
            <button onClick={handleSave} disabled={submitting}>
              <FiSave className="hover:text-green-600" />
            </button>
            <button onClick={() => setEditing(false)}>
              <FiX className="hover:text-red-600" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>
              <FiEdit className="hover:text-blue-600" />
            </button>
            <button onClick={handleDelete}>
              <FiTrash2 className="hover:text-red-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PhoneItem;
