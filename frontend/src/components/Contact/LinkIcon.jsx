import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaFacebook,
} from "react-icons/fa"; // common social icons
import { SiGmail } from "react-icons/si";

function LinkIcon({ platform }) {
  // Match platform name to icon
  const iconMap = {
    instagram: <FaInstagram className="text-yellow-500" />,
    linkedin: <FaLinkedin className="text-blue-600" />,
    github: <FaGithub className="text-black" />,
    twitter: <FaTwitter />,
    website: <FaGlobe />,
    email: <SiGmail className="text-red-600" />,
    facebook: <FaFacebook className="text-blue-600" />,
  };

  // normalize platform (lowercase) to avoid errors
  const normalizedPlatform = platform.toLowerCase();

  return (
    <div className="text-2xl">
      {iconMap[normalizedPlatform] || <FaGlobe className="text-purple-800" />}{" "}
      {/* fallback icon */}
    </div>
  );
}

export default LinkIcon;
