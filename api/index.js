const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
      <h1 style="color: #4CAF50;"> Welcome to <em>RandomQuoteAPI</em>!</h1>
      <p>Use the following endpoints to explore inspirational quotes:</p>
      <ul>
        <li><code>/random</code> | Get a random inspirational quote</li>
         <p><strong>Click the link :- </strong> <a href="https://random-quote-api-five.vercel.app/random" target="_blank">Get a random inspirational quote</a></p>
        <li><code>/quotes</code> | View all quotes</li>
         <p><strong>Click the link :- </strong> <a href="https://random-quote-api-five.vercel.app/quotes" target="_blank">View all quotes</a></p>
      </ul>
      <p><strong>Source Code:</strong> <a href="https://github.com/VinayakGubber/RandomQuoteAPI" target="_blank">GitHub Repository</a></p>
    </div>
    `);
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
