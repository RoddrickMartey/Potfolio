import React, { useState } from "react";
import Joi from "joi";
import axiosInstance from "../../app/axiosConfig";
import SkillItem from "./Items/SkillItem";

function SkillsEdit({ fetchUser, skills }) {
  const [newSkill, setNewSkill] = useState("");
  const [submittingForm, setSubmittingForm] = useState(false);
  const [errors, setErrors] = useState({});

  // Joi schema for validation
  const skillSchema = Joi.object({
    newSkill: Joi.string().min(3).required().messages({
      "string.empty": "Skill is required.",
      "string.min": "Skill should be at least 3 characters long.",
    }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form input using Joi
    const { error } = skillSchema.validate({ newSkill });
    if (error) {
      setErrors({ newSkill: error.details[0].message });
      return;
    }

    setSubmittingForm(true);
    setErrors({}); // Clear previous errors

    try {
      // Log the skill before submitting for debugging
      console.log("Submitting Skill:", { newSkill });

      // Assuming the API endpoint is correct
      const response = await axiosInstance.post("/addSkill", {
        skill: newSkill,
      });

      fetchUser();
      setNewSkill("");
      console.log("Skill added successfully:", response.data);
    } catch (err) {
      console.error("Error submitting skill:", err);
      setErrors({ apiError: "Something went wrong, please try again later." });
    } finally {
      setSubmittingForm(false); // Reset submitting state after form submission
    }
  };

  return (
    <section className="p-6 bg-white border border-gray-300 rounded-md shadow-md">
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">Add Skill:</label>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={submittingForm}
              placeholder="Enter a new skill"
            />
            {errors.newSkill && (
              <p className="text-red-500 text-sm">{errors.newSkill}</p>
            )}
            {errors.apiError && (
              <p className="text-red-500 text-sm">{errors.apiError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={submittingForm}
          >
            {submittingForm ? "Submitting..." : "Submit Skill"}
          </button>
        </form>
      </div>

      <div className="mt-6">
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet</p>
        ) : (
          skills.map((skill, index) => (
            <SkillItem skill={skill} key={index} fetchUser={fetchUser} />
          ))
        )}
      </div>
    </section>
  );
}

export default SkillsEdit;
