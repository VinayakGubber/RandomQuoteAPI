const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the RandomQuoteAPI!",
    endpoints: {
      "/random": "Get a random inspirational quote",
      "/quotes": "Access the complete list (if implemented)",
      github: "https://github.com/VinayakGubber/RandomQuoteAPI",
    },
  });
});

app.get("/random", (req, res) => {
  const quotesPath = path.resolve(__dirname, "../quotes.json");
  const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

app.get("/quotes", (req, res) => {
  const quotesPath = path.resolve(__dirname, "../quotes.json");
  const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));
  res.json(quotes);
});

module.exports = app;
