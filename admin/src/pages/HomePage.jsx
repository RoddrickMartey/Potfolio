import React, { useEffect, useState } from "react";
import axiosInstance from "../app/axiosConfig";

function HomePage() {
  const [user, setUser] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [skills, setSkills] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/me");
      setUser(res.data); // fixed this line
      setPhoneNumbers(res.data.phoneNumbers);
      setSocialLinks(res.data.socialLinks);
      setSkills(res.data.skills);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user:", error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="px-3 py-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Home Page</h1>
      {user ? (
        <div className="space-y-2">
          <div className="p-4 border border-gray-300 rounded-md bg-white ">
            <div className="mb-3">
              <p className="text-sm text-gray-700">
                <strong className="text-black">Name:</strong> {user.name}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-700">
                <strong className="text-black">Email:</strong> {user.email}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700">
                <strong className="text-black">Bio:</strong> {user.bio}
              </p>
            </div>

            <a
              href={user.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Download Resume
            </a>
          </div>

          {/* Phone Numbers */}
          <div className="p-4 border border-gray-300 rounded-md bg-white">
            <h2 className="text-lg font-medium mb-2">Phone Numbers</h2>
            {phoneNumbers.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {phoneNumbers.map((phone, index) => (
                  <li key={index}>{phone.number}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No phone numbers available.
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="p-4 border border-gray-300 rounded-md bg-white">
            <h2 className="text-lg font-medium mb-2">Social Links</h2>
            {socialLinks.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <span className="font-semibold">{link.platform}: </span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.url}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No social links available.
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="p-4 border border-gray-300 rounded-md bg-white">
            <h2 className="text-lg font-medium mb-2">Skills</h2>
            {skills.length > 0 ? (
              <ul className="flex flex-wrap gap-2 text-sm text-gray-700">
                {skills.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-800"
                  >
                    {item.skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No skills listed.</p>
            )}
          </div>

          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </section>
  );
}

export default HomePage;
