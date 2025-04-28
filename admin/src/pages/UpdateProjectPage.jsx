/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Joi from "joi";
import axiosInstance from "../app/axiosConfig";
import { useNavigate, useParams } from "react-router";
import ProjectComments from "../components/HomePage/project/ProjectComments";

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
  techstack: Joi.array()
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
  screenshot: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
      })
    )
    .min(1)
    .required(),
});

function UpdateProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "PERSONAL",
    techstack: [{ category: "FRONTEND", skill: "" }],
    link: "",
    screenshot: [{ url: "" }],
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStackChange = (index, key, value) => {
    const updatedStacks = [...form.techstack];
    updatedStacks[index][key] = value;
    setForm({ ...form, techstack: updatedStacks });
  };

  const handleScreenshotChange = (index, value) => {
    const updated = [...form.screenshot];
    updated[index].url = value;
    setForm({ ...form, screenshot: updated });
  };

  const addStack = () => {
    setForm((prev) => ({
      ...prev,
      techstack: [...prev.techstack, { category: "FRONTEND", skill: "" }],
    }));
  };

  const addScreenshot = () => {
    setForm((prev) => ({
      ...prev,
      screenshot: [...prev.screenshot, { url: "" }],
    }));
  };

  const removeStack = (index) => {
    const updatedStacks = form.techstack.filter((_, i) => i !== index);
    setForm({ ...form, techstack: updatedStacks });
  };

  const removeScreenshot = (index) => {
    const updatedScreenshots = form.screenshot.filter((_, i) => i !== index);
    setForm({ ...form, screenshot: updatedScreenshots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove unwanted fields like `id` and `createdAt` from each techStack
    const cleanedTechStacks = form.techstack.map(
      ({ id, createdAt, updatedAt, ...rest }) => rest
    );

    const cleanedScreenshot = form.screenshot.map(
      ({ id, createdAt, updatedAt, projectId, ...rest }) => rest
    );
    const cleanedForm = {
      ...form,
      techstack: cleanedTechStacks,
      screenshot: cleanedScreenshot,
    };

    const { error } = projectSchema.validate(cleanedForm);
    if (error) {
      setErrors({ general: error.details[0].message });
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.patch(`/updateProject/${project.id}`, cleanedForm);
      navigate("/projects");
    } catch (err) {
      setErrors({
        general: err?.response?.data?.message || "Submission failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProject = async () => {
    try {
      const res = await axiosInstance.get(`/project/${id}`);
      const project = res.data;
      setProject(project);
      setComment(project.comment);
      // Prepopulate the form with project data
      setForm({
        title: project.title,
        description: project.description,
        category: project.category,
        techstack: project.techstack,
        link: project.link,
        screenshot: project.screenshot,
      });
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <section className="p-3 space-y-4">
      <section className="p-4 space-y-4 border rounded bg-white">
        <h2 className="text-xl font-bold">Update Project</h2>
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
            {form.techstack.map((stack, index) => (
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
                <button
                  type="button"
                  onClick={() => removeStack(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
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
            {form.screenshot.map((shot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  key={index}
                  placeholder="Screenshot URL"
                  className="w-full mb-2 p-2 border rounded"
                  value={shot.url}
                  onChange={(e) =>
                    handleScreenshotChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeScreenshot(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
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
              {submitting ? "Submitting..." : "Update Project"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
      <section>
        {comment !== null && (
          <ProjectComments comments={comment} fetchProject={fetchProject} />
        )}
      </section>
    </section>
  );
}

export default UpdateProjectPage;
