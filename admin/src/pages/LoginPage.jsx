import React, { useState } from "react";
import Joi from "joi";
import axiosInstance from "../app/axiosConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/userSlice";
import { useNavigate } from "react-router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Joi schema for validation
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields using Joi
    const { error } = schema.validate(
      { username, password },
      { abortEarly: false }
    );

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.context.key] = detail.message;
      });
      setErrors(newErrors); // Update state with validation errors
    } else {
      // If no errors, proceed with the form submission (e.g., API call)
    }
    const formadata = { username, password };
    try {
      const res = await axiosInstance.post("/login", formadata);

      dispatch(loginSuccess());
      navigate("/userInfo");
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-white text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 border border-gray-300">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your username"
            />
            {errors.username && <p>{errors.username}</p>}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
