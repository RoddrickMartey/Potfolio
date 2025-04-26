import React, { useState } from "react";
import axiosInstance from "../../../app/axiosConfig";
import Joi from "joi";

const projectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string()
    .valid(
      "PERSONAL",
      "CLIENT",
      "SCHOOL",
      "WORK",
      "HACKATHON",
      "OPEN_SOURCE",
      "FREELANCE",
      "OTHER"
    )
    .required(),
  techStacks: Joi.array()
    .items(
      Joi.object({
        category: Joi.string()
          .valid(
            "FRONTEND",
            "BACKEND",
            "DATABASE",
            "DEVOPS",
            "MOBILE",
            "TOOLS",
            "TESTING",
            "DESIGN",
            "OFFICE",
            "OTHER"
          )
          .required(),
        skill: Joi.string().min(1).required(),
      })
    )
    .min(1)
    .required(),
  link: Joi.string().uri().required(),
  screenshots: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
      })
    )
    .min(1)
    .required(),
});

function AddProject({ changePage }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "PERSONAL",
    techStacks: [{ category: "FRONTEND", skill: "" }],
    link: "",
    screenshots: [{ url: "" }],
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStackChange = (index, key, value) => {
    const updatedStacks = [...form.techStacks];
    updatedStacks[index][key] = value;
    setForm({ ...form, techStacks: updatedStacks });
  };

  const handleScreenshotChange = (index, value) => {
    const updated = [...form.screenshots];
    updated[index].url = value;
    setForm({ ...form, screenshots: updated });
  };

  const addStack = () => {
    setForm((prev) => ({
      ...prev,
      techStacks: [...prev.techStacks, { category: "FRONTEND", skill: "" }],
    }));
  };

  const addScreenshot = () => {
    setForm((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, { url: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = projectSchema.validate(form);
    if (error) {
      setErrors({ general: error.details[0].message });
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post("/addProject", form);
      changePage();
    } catch (err) {
      setErrors({
        general: err?.response?.data?.message || "Submission failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="p-4 space-y-4 border rounded bg-white">
      <h2 className="text-xl font-bold">Add New Project</h2>
      {errors.general && <p className="text-red-600">{errors.general}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full p-2 border rounded"
        >
          {[
            "PERSONAL",
            "CLIENT",
            "SCHOOL",
            "WORK",
            "HACKATHON",
            "OPEN_SOURCE",
            "FREELANCE",
            "OTHER",
          ].map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        <div>
          <h4 className="font-semibold">Tech Stacks</h4>
          {form.techStacks.map((stack, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <select
                value={stack.category}
                onChange={(e) =>
                  handleStackChange(index, "category", e.target.value)
                }
                className="p-2 border rounded"
              >
                {[
                  "FRONTEND",
                  "BACKEND",
                  "DATABASE",
                  "DEVOPS",
                  "MOBILE",
                  "TOOLS",
                  "TESTING",
                  "DESIGN",
                  "OFFICE",
                  "OTHER",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                placeholder="Skill"
                className="p-2 border rounded flex-1"
                value={stack.skill}
                onChange={(e) =>
                  handleStackChange(index, "skill", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={addStack} className="text-blue-600">
            + Add Tech Stack
          </button>
        </div>

        <input
          placeholder="Live Link (URL)"
          className="w-full p-2 border rounded"
          value={form.link}
          onChange={(e) => handleChange("link", e.target.value)}
        />

        <div>
          <h4 className="font-semibold">Screenshots</h4>
          {form.screenshots.map((shot, index) => (
            <input
              key={index}
              placeholder="Screenshot URL"
              className="w-full mb-2 p-2 border rounded"
              value={shot.url}
              onChange={(e) => handleScreenshotChange(index, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={addScreenshot}
            className="text-blue-600"
          >
            + Add Screenshot
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            {submitting ? "Submitting..." : "Add Project"}
          </button>
          <button
            type="button"
            onClick={changePage}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddProject;
