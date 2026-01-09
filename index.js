const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// REAL AI explanation endpoint
app.get("/explain", async (req, res) => {
  const { course, topic } = req.query;

  if (!course || !topic) {
    return res.status(400).json({
      error: "Please provide both course and topic"
    });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful CSE tutor. Explain topics clearly with simple language and examples."
        },
        {
          role: "user",
          content: `Explain ${topic} in ${course} for a beginner CSE student.`
        }
      ]
    });

    res.json({
      course,
      topic,
      explanation: response.choices[0].message.content
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "AI explanation failed"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
