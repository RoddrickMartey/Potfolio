import React, { useState } from "react";
import AddProject from "../components/HomePage/project/AddProject";
import ProjectDisplay from "../components/HomePage/project/ProjectDisplay";

const pages = { display: "display", add: "add" };

function ProjectsPage() {
  const [view, setView] = useState(pages.display);

  const changePage = () => {
    setView((prev) => (prev === pages.display ? pages.add : pages.display));
  };

  return (
    <section>
      {view === pages.display ? (
        <ProjectDisplay changePage={changePage} />
      ) : (
        <AddProject changePage={changePage} />
      )}
    </section>
  );
}

export default ProjectsPage;
