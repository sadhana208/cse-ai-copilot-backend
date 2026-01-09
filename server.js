const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("CSE AI Copilot Backend Running");
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "backend alive" });
});

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

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
