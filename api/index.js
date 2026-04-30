const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RandomQuoteAPI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root { 
      --bg: #F7F6F3;
      --surface: #FFFFFF;
      --border: rgba(0,0,0,0.08);
      --border-hover: rgba(0,0,0,0.18);
      --text-primary: #1A1916;
      --text-secondary: #6B6860;
      --text-tertiary: #A09E99;
      --green: #2D7A4F;
      --green-bg: #F0F9F4;
      --sans: 'DM Sans', system-ui, sans-serif;
      --mono: 'DM Mono', 'SF Mono', monospace;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #141412;
        --surface: #1E1D1B;
        --border: rgba(255,255,255,0.08);
        --border-hover: rgba(255,255,255,0.18);
        --text-primary: #F0EEE9;
        --text-secondary: #9A9890;
        --text-tertiary: #5C5A56;
        --green: #4CAF77;
        --green-bg: #0F2018;
      }
    }

    html, body {
      height: 100%;
      font-family: var(--sans);
      background: var(--bg);
      color: var(--text-primary);
      font-size: 15px;
      line-height: 1.6;
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }

    .wrap {
      max-width: 540px;
      width: 100%;
    }

    /* Header */
    .header {
      margin-bottom: 2.5rem;
    }

    .label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      margin-bottom: 0.75rem;
    }

    .label::before {
      content: '';
      display: block;
      width: 20px;
      height: 1px;
      background: var(--text-tertiary);
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1.15;
      color: var(--text-primary);
      margin-bottom: 0.6rem;
    }

    h1 span {
      color: var(--text-tertiary);
      font-weight: 300;
    }

    .subtitle {
      font-size: 15px;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Endpoint cards */
    .cards {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 2rem;
    }

    .card {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: 12px;
      padding: 1.1rem 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      transition: border-color 0.2s;
    }

    .card:hover {
      border-color: var(--border-hover);
    }

    .card-left { flex: 1; min-width: 0; }

    .endpoint-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.3rem;
    }

    .method {
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 500;
      color: var(--green);
      background: var(--green-bg);
      border: 0.5px solid rgba(45,122,79,0.2);
      border-radius: 4px;
      padding: 2px 7px;
      letter-spacing: 0.04em;
    }

    .path {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--text-primary);
      font-weight: 400;
    }

    .card-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .try-btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-family: var(--sans);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-primary);
      text-decoration: none;
      border: 0.5px solid var(--border-hover);
      border-radius: 6px;
      padding: 0.4rem 0.8rem;
      background: transparent;
      transition: background 0.2s, border-color 0.2s;
      white-space: nowrap;
    }

    .try-btn:hover {
      background: var(--bg);
      border-color: var(--text-secondary);
    }

    .try-btn svg {
      width: 11px;
      height: 11px;
    }

    /* Footer */
    .footer {
      border-top: 0.5px solid var(--border);
      padding-top: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .footer-note {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }

    .github-link:hover { color: var(--text-primary); }

    .github-link svg {
      width: 15px;
      height: 15px;
    }

    @media (max-width: 480px) {
      h1 { font-size: 1.7rem; }
      .card { flex-direction: column; align-items: flex-start; }
      .footer { flex-direction: column; gap: 0.75rem; }
    }
  </style>
</head>
<body>
  <div class="wrap">

    <div class="header">
      <div class="label">REST API</div>
      <h1>RandomQuote<span>API</span></h1>
      <p class="subtitle">A simple, open API for inspirational quotes. No auth required.</p>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-left">
          <div class="endpoint-row">
            <span class="method">GET</span>
            <span class="path">/random</span>
          </div>
          <p class="card-desc">Returns a single random quote from the collection</p>
        </div>
        <a href="https://random-quote-api-five.vercel.app/random" target="_blank" class="try-btn">
          Try it
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <div class="card">
        <div class="card-left">
          <div class="endpoint-row">
            <span class="method">GET</span>
            <span class="path">/quotes</span>
          </div>
          <p class="card-desc">Browse the full collection of curated quotes</p>
        </div>
        <a href="https://random-quote-api-five.vercel.app/quotes" target="_blank" class="try-btn">
          Try it
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="footer">
      <p class="footer-note">No API key &nbsp;·&nbsp; No rate limits &nbsp;·&nbsp; Open source</p>
      <a href="https://github.com/VinayakGubber/RandomQuoteAPI" target="_blank" class="github-link">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        VinayakGubber/RandomQuoteAPI
      </a>
    </div>

  </div>
</body>
</html>

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
