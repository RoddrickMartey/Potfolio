/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import axiosInstance from "../app/axiosConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

function AboutPage() {
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ["aboutData"],
    queryFn: () =>
      axiosInstance.get("/about").then((res) => {
        console.log(res.data);
        return res.data;
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
      <section className="flex items-center justify-center h-60 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-700">{error.message}</p>
        </div>
      </section>
    );

  if (!data) return null; // Prevent error if somehow data is still undefined

  const { name, bio, skills = [] } = data; // Destructure safely with default

  return (
    <section className="flex items-center justify-center w-full min-h-[calc(100vh-56px)] px-4">
      <div className="flex flex-col gap-10 max-w-4xl text-center md:text-left my-20">
        {/* Intro Text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-3xl font-bold text-white leading-relaxed tracking-wide underline underline-offset-8 decoration-4 decoration-black">
            Hi, My name is{" "}
            <span className="inline-block text-black underline underline-offset-8 decoration-4 decoration-white">
              {name} 👋
            </span>{" "}
          </p>

          {/* Tagline */}
          <p className="text-lg text-white leading-relaxed font-semibold">
            I love crafting fast, responsive, and beautiful web experiences.
          </p>

          <p className="text-white text-lg leading-relaxed font-semibold">
            {bio}
          </p>
        </motion.div>

        {/* Skills List */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-3 w-full">
          {skills.map((skill, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="flex items-center text-white"
            >
              {/* Black square number */}
              <span className="w-8 h-8 flex items-center justify-center bg-black text-white text-xs font-bold">
                {index + 1}
              </span>
              {/* Skill text */}
              <span className="px-4 h-8 bg-white w-full text-black font-semibold items-center flex">
                {skill.skill}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="mt-8"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/projects")}
            className="px-6 py-2 font-bold text-black bg-white rounded-md shadow-[3px_3px_0px_#000] border-2  border-black"
          >
            View My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutPage;
