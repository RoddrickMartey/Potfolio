import React from "react";
import IconSelect from "./IconSelect";

// Function to group tech stacks by category
const groupByCategory = (techStacks) => {
  return techStacks.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});
};

function TechStacksSection({ techStacks }) {
  const groupedTechStacks = groupByCategory(techStacks);

  return (
    <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.keys(groupedTechStacks).map((category) => (
        <div
          key={category}
          className="flex flex-col p-4 bg-purple-100 rounded-md h-full shadow-[2px_2px_0px_#000] border "
        >
          <h3 className="text-xl font-bold text-purple-800 mb-2">{category}</h3>
          <ul className="space-y-2 flex-grow">
            {groupedTechStacks[category].map((tech) => (
              <li
                key={tech.id}
                className="text-black flex items-center justify-between gap-2 uppercase text-sm"
              >
                {tech.skill} <IconSelect name={tech.skill} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TechStacksSection;
