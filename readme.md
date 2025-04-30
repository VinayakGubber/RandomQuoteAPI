🎯 Random Quote API
A minimalist Node.js-powered REST API that delivers random inspirational quotes — fully self-contained with zero external quote dependencies. Built to serve as a backend utility for NoteSphere and designed for flexibility, control, and fast deployment.

✨ Features
🧠 Serve inspirational quotes via a simple /random endpoint

📂 Self-managed quotes.json — no external API reliance

➕ Easily extendable — add or remove quotes manually

⚡ Blazing fast — powered by Express.js

🔄 CORS-enabled for cross-origin frontend consumption

🚀 Instant deployment with Vercel

🛠 Built to be used in a larger project: NoteSphere

📦 Installation
Clone the repo and install dependencies:

bash
Copy
Edit
git clone https://github.com/VinayakGubber/RandomQuoteAPI.git
cd RandomQuoteAPI
npm install
🔧 Usage
Start the development server:

bash
Copy
Edit
npm start
Visit in your browser or REST client:

http://localhost:3000/ → Welcome message

http://localhost:3000/random → Returns a random quote as JSON

🌐 Live Deployment
Deployed instantly and freely via Vercel:

arduino
Copy
Edit
https://random-quote-api-yourname.vercel.app/
🧰 API Endpoints
GET /
Returns a simple welcome message.

GET /random
Returns one randomly selected quote from quotes.json:

json
Copy
Edit
{
  "quote": "Stay hungry, stay foolish.",
  "author": "Steve Jobs"
}
🗃️ quotes.json
This project uses a local quotes.json file to eliminate reliance on third-party APIs.

Why?

✅ Full control over quote content

➕ Easy to add new quotes or delete unwanted ones

🛡️ No API rate limits or downtime risks

Example structure:

json
Copy
Edit
[
  {
    "quote": "Life is short, and it's up to you to make it sweet.",
    "author": "Sarah Louise Delany"
  },
  {
    "quote": "You miss 100% of the shots you don't take.",
    "author": "Wayne Gretzky"
  }
]
🔨 Built For
This API was originally built as a utility service for a personal project:
👉 NoteSphere — a notes app with motivational context, where each session can fetch a new quote for the user.

📄 License
MIT — free to use, share, and modify.