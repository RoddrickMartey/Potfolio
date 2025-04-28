/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import axiosInstance from "../app/axiosConfig";
import { motion } from "framer-motion";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
import { SiExpress } from "react-icons/si";
import { FaLaptopCode } from "react-icons/fa";
import { SiMysql, SiPrisma } from "react-icons/si";

function HomePage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["homeData"],
    queryFn: () =>
      axiosInstance.get("/home").then((res) => {
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
          <p className="text-gray-700">{error.message}</p>
        </div>
      </section>
    );

  return (
    <section className="flex items-center justify-center mt-28">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex w-[900px] items-center rounded-lg justify-between bg-white p-10 shadow-[4px_4px_0px_#000000] border-4 "
      >
        {/* Left side: Text */}
        <motion.div
          className="max-w-[430px] "
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
        >
          <p className="text-3xl font-bold text-black leading-relaxed tracking-wide">
            Hi there, I'm{" "}
            <span className="inline-block rounded-md bg-black text-white px-2 py-1">
              {data.name}
            </span>
            , a passionate{" "}
            <span className="text-purple-800 font-bold">
              fullstack web developer
            </span>
            .
          </p>

          <div className="flex items-center gap-x-4 mt-5">
            {[
              {
                icon: (
                  <FaReact size={40} className="text-black bg-white text-lg" />
                ),
                delay: 0.4,
              },
              {
                icon: (
                  <IoLogoJavascript size={40} className="text-black bg-white" />
                ),
                delay: 0.6,
              },
              {
                icon: (
                  <SiExpress
                    size={40}
                    className="text-white bg-black rounded-full p-0.5"
                  />
                ),
                delay: 0.8,
              },
              {
                icon: <FaLaptopCode size={40} className="text-black" />,
                delay: 1.0,
              },
              {
                icon: <SiMysql size={40} className="text-black" />,
                delay: 1.2,
              },
              {
                icon: <SiPrisma size={40} className="text-black" />,
                delay: 1.4,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  delay: item.delay,
                  duration: 2.5, // shorter duration makes the movement smoother
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center"
                style={{ transformOrigin: "50% 50%" }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side: Picture placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
          className="w-[300px] h-[300px] overflow-hidden flex items-center justify-center rounded-md shadow-[3px_3px_0px_#6e11b0] border-2 border-purple-800"
        >
          <img
            src="https://res.cloudinary.com/dd4bv2upq/image/upload/v1745709972/portfolio_pic_zqq1ra.jpg"
            alt="My picture"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HomePage;
