const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("CSE AI Copilot Backend Running");
});

app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "backend alive" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
