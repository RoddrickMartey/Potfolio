import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCss3Alt,
  FaHtml5,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { DiJavascript1, DiMysql, DiGit, DiDocker } from "react-icons/di";
import {
  SiTailwindcss,
  SiExpress,
  SiPrisma,
  SiRedux,
  SiPostgresql,
} from "react-icons/si";

// Mapping function to return the appropriate icon based on the tech stack name with colors
const getIconForTech = (techName) => {
  const techNameLower = techName.toLowerCase();

  if (techNameLower.includes("react"))
    return <FaReact style={{ color: "#61DBFB" }} />; // React blue
  if (techNameLower.includes("node"))
    return <FaNodeJs style={{ color: "#68A063" }} />; // Node.js green
  if (techNameLower.includes("mysql"))
    return <DiMysql style={{ color: "#4479A1" }} />; // MySQL blue
  if (techNameLower.includes("javascript"))
    return <DiJavascript1 style={{ color: "#F7DF1E" }} />; // JavaScript yellow
  if (techNameLower.includes("css"))
    return <FaCss3Alt style={{ color: "#2965F1" }} />; // CSS blue
  if (techNameLower.includes("html"))
    return <FaHtml5 style={{ color: "#E34F26" }} />; // HTML red
  if (techNameLower.includes("python"))
    return <FaPython style={{ color: "#3776AB" }} />; // Python blue
  if (techNameLower.includes("java"))
    return <FaJava style={{ color: "#007396" }} />; // Java blue
  if (techNameLower.includes("git"))
    return <DiGit style={{ color: "#F34F29" }} />; // Git orange
  if (techNameLower.includes("docker"))
    return <DiDocker style={{ color: "#2496ED" }} />; // Docker blue
  if (techNameLower.includes("tailwind"))
    return <SiTailwindcss style={{ color: "#38B2AC" }} />; // Tailwind green
  if (techNameLower.includes("express"))
    return <SiExpress style={{ color: "#000000" }} />; // Express black
  if (techNameLower.includes("prisma"))
    return <SiPrisma style={{ color: "#2D3748" }} />; // Prisma dark
  if (techNameLower.includes("redux"))
    return <SiRedux style={{ color: "#764ABC" }} />; // Redux purple
  if (techNameLower.includes("postgresql"))
    return <SiPostgresql style={{ color: "#336791" }} />; // PostgreSQL blue

  // Default icon if no match is found (neutral gray)
  return <FaDatabase style={{ color: "#A0AEC0" }} />;
};

function IconSelect({ name }) {
  return <div className="text-2xl">{getIconForTech(name)}</div>;
}

export default IconSelect;
