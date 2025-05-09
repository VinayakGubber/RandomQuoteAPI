const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send(`Welcome to RandomQuoteAPI!<br>
Use <code>/random</code> to get a random inspirational quote.<br>
Source: <a href="https://github.com/VinayakGubber/RandomQuoteAPI">GitHub</a>`);
});

app.get("/quotes", (req, res) => {
  const quotesPath = path.resolve(__dirname, "../quotes.json");
  const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));
  res.json(quotes);
});

module.exports = app;
