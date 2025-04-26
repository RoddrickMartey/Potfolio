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

function UpdateProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComment] = useState(null);
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

  const removeStack = (index) => {
    const updatedStacks = form.techStacks.filter((_, i) => i !== index);
    setForm({ ...form, techStacks: updatedStacks });
  };

  const removeScreenshot = (index) => {
    const updatedScreenshots = form.screenshots.filter((_, i) => i !== index);
    setForm({ ...form, screenshots: updatedScreenshots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove unwanted fields like `id` and `createdAt` from each techStack
    const cleanedTechStacks = form.techStacks.map(
      ({ id, createdAt, updatedAt, ...rest }) => rest
    );

    const cleanedScreenshot = form.screenshots.map(
      ({ id, createdAt, updatedAt, projectId, ...rest }) => rest
    );
    const cleanedForm = {
      ...form,
      techStacks: cleanedTechStacks,
      screenshots: cleanedScreenshot,
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
      console.log(err.response);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProject = async () => {
    try {
      const res = await axiosInstance.get(`/project/${id}`);
      const project = res.data;
      setProject(project);
      setComment(project.comments);
      // Prepopulate the form with project data
      setForm({
        title: project.title,
        description: project.description,
        category: project.category,
        techStacks: project.techStacks,
        link: project.link,
        screenshots: project.screenshots,
      });
    } catch (error) {
      console.log(error.response);
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
            {form.screenshots.map((shot, index) => (
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
        {comments !== null && (
          <ProjectComments comments={comments} fetchProject={fetchProject} />
        )}
      </section>
    </section>
  );
}

export default UpdateProjectPage;
