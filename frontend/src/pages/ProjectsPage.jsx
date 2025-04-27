/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import axiosInstance from "../app/axiosConfig";
import { motion } from "framer-motion";
import ProjectItem from "../components/Project/ProjectItem";

function ProjectsPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["projectData"],
    queryFn: () =>
      axiosInstance.get("/projects").then((res) => {
        console.log(res.data); // you can keep this for checking
        return res.data; // <-- THIS IS THE IMPORTANT PART
      }),
  });

  if (isPending)
    return (
      <section className="h-96 w-full flex items-center justify-center">
        <OrbitProgress
          color="#fff"
          size="large"
          text="Loading"
          textColor="#fff"
        />
      </section>
    );

  if (error)
    return (
      <section className="flex items-center justify-center h-60">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-white">{error.message}</p>
        </div>
      </section>
    );

  return (
    <section className="flex flex-col items-center gap-8  w-10/12 mx-auto min-h-[calc(100vh-56px)] py-5 text-center">
      <div className="mt-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-bold text-white"
        >
          My Projects
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-10">
        {data?.length > 0 ? (
          data.map((project, index) => {
            const delayTime = index * 0.1;
            return (
              <ProjectItem
                key={index}
                project={project}
                delayTime={delayTime}
              />
            );
          })
        ) : (
          <p className="text-white">No projects found.</p>
        )}
      </div>
    </section>
  );
}

export default ProjectsPage;
