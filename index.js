const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send("CSE AI Copilot Backend Running");
});

// Health check
app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "backend alive" });
});

// List of core CSE courses
app.get("/courses", (req, res) => {
  res.json({
    courses: [
      "Programming Fundamentals",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Discrete Mathematics",
      "Software Engineering"
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
