import React, { useState } from "react";
import PhoneItem from "./Items/PhoneItem";
import axiosInstance from "../../app/axiosConfig";
import Joi from "joi";

function PhoneEdit({ fetchUser, phoneNumbers }) {
  const [newNumber, setNewNumber] = useState("");
  const [submittingForm, setSubmittingForm] = useState(false);
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    number: Joi.string()
      .pattern(/^[0-9+]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Phone number must be 10 to 15 digits with optional '+' for international format",
        "any.required": "Phone number is required",
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate({ number: newNumber });
    if (error) {
      setErrors({ number: error.details[0].message });
      return;
    }

    setSubmittingForm(true);
    setErrors({});

    try {
      const res = await axiosInstance.post("/addPhoneNumber", {
        number: newNumber,
      });

      setNewNumber("");
      fetchUser();
    } catch (err) {
      setErrors({
        apiError: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setSubmittingForm(false);
    }
  };

  return (
    <section className="p-4 border border-gray-300 rounded-md bg-white">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 mb-3">
          <label className="font-semibold">Add Phone Number:</label>
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            className="p-1 border border-gray-400 disabled:bg-gray-400"
            disabled={submittingForm}
          />
          {errors.number && <p className="text-red-500">{errors.number}</p>}
          {errors.apiError && <p className="text-red-500">{errors.apiError}</p>}
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
          disabled={submittingForm}
        >
          {submittingForm ? "Submitting..." : "Submit Number"}
        </button>
      </form>

      <div className="mt-6">
        {phoneNumbers.length === 0 ? (
          <p className="text-gray-500">No phone numbers added yet</p>
        ) : (
          phoneNumbers.map((phone, index) => (
            <PhoneItem phone={phone} key={index} fetchUser={fetchUser} />
          ))
        )}
      </div>
    </section>
  );
}

export default PhoneEdit;
