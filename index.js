// clean redeploy trigger
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

// List of CSE core courses
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

// AI explanation endpoint (NO openai package)
app.get("/explain", async (req, res) => {
  const { course, topic } = req.query;

  if (!course || !topic) {
    return res.status(400).json({
      error: "Please provide both course and topic"
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is missing in Railway variables"
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful CSE tutor. Explain topics clearly with examples."
          },
          {
            role: "user",
            content: `Explain ${topic} in ${course} for a beginner.`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI API error",
        details: data
      });
    }

    res.json({
      course,
      topic,
      explanation: data.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI request failed"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
