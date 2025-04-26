import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <section className="text-center p-10">
      <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link to="/userInfo" className="text-blue-500 underline">
        Go to User Info
      </Link>
    </section>
  );
}

export default NotFound;
