import React, { useEffect, useState } from "react";
import axiosInstance from "../../../app/axiosConfig";
import ProjectsItem from "./ProjectsItem";

function ProjectDisplay({ changePage }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("/projects");
        setProjects(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error.response);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={changePage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectsItem key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectDisplay;
