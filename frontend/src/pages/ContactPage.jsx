import React from "react";
import { useQuery } from "@tanstack/react-query";
import { OrbitProgress } from "react-loading-indicators";
import axiosInstance from "../app/axiosConfig";
import { motion } from "framer-motion";
import { LuPhone } from "react-icons/lu";
import LinkIcon from "../components/Contact/LinkIcon";
import { IoMail } from "react-icons/io5";

function ContactPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["aboutData"],
    queryFn: () => axiosInstance.get("/contact").then((res) => res.data),
  });

  if (isPending || !data) {
    return (
      <section className="h-96 w-full flex items-center justify-center">
        <OrbitProgress
          color="#ffffff"
          size="large"
          text="Loading"
          textColor="#ffffff"
        />
      </section>
    );
  }

  if (error) {
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
  }

  return (
    <section className="flex items-center justify-center mt-28">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col w-full max-w-2xl items-center rounded-lg justify-center bg-white p-10 shadow-[4px_4px_0px_#000000] border-4 space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-purple-700">{data.name}</h1>
          <a
            href={`mailto:${data.email}`}
            className="text-lg text-gray-700 flex items-center gap-2 hover:underline"
          >
            <IoMail className="text-purple-600 text-2xl" />
            {data.email}
          </a>
        </div>

        <div className="w-full space-y-6 flex justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Phone Numbers</h2>
            <div className="space-y-2">
              {data.phonenumber?.length > 0 ? (
                data.phonenumber.map((phoneNumber, index) => (
                  <a
                    key={index}
                    href={`tel:${phoneNumber.number}`}
                    className="flex items-center gap-2 text-gray-800 hover:underline"
                  >
                    <LuPhone className="text-purple-600" />
                    <span>{phoneNumber.number}</span>
                  </a>
                ))
              ) : (
                <p className="text-gray-500">No phone numbers available.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="grid grid-cols-4 gap-4">
              {data.sociallink?.length > 0 ? (
                data.sociallink.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition"
                  >
                    <LinkIcon platform={link.platform} />
                  </a>
                ))
              ) : (
                <p className="text-gray-500">No social links available.</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactPage;
