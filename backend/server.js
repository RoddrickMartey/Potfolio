import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the CORS package
import userRouter from "./routes/userRoute.js";
import visitorRouter from "./routes/visitorRoute.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow cookies to be sent with the request
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());
app.use(cookieParser());

// Route Handlers
app.use("/api/user", userRouter);
app.use("/api/visitor", visitorRouter);

// Simple route for testing
app.get("/api", (req, res) => {
  res.send("Hello, welcome to my portfolio backend!");
});

// Set the server to listen on port 5000 (or use the environment port)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
