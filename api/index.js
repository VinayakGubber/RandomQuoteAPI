const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Random Quote API");
});

app.get("/random", (req, res) => {
  const quotesPath = path.resolve(__dirname, "../quotes.json");
  const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

module.exports = app;
