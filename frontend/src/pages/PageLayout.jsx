import React from "react";
import Header from "../components/Layout/Header";
import { Outlet } from "react-router";

function PageLayout() {
  return (
    <main className="bg-purple-800 min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
}

export default PageLayout;
