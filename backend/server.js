import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Hello, welcome to my portfolio backend!");
});

// Set the server to listen on port 5000 (or use the environment port)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
