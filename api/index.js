const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Random Quote API');
});

app.get('/random', (req, res) => {
  const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
