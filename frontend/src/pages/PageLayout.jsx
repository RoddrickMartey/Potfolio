import React from "react";
import Header from "../components/Layout/Header";
import { Outlet } from "react-router";

function PageLayout() {
  return (
    <main className="bg-purple-900 min-h-screen pb-7">
      <Header />
      <Outlet />
    </main>
  );
}

export default PageLayout;
