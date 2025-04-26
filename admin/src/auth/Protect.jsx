import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function Protect() {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Protect;
