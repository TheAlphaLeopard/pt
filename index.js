const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve the embeddable HTML
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Agent Chat</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        #chat { border: 1px solid #ccc; height: 300px; overflow-y: scroll; padding: 10px; }
        input { width: 80%; padding: 10px; }
        button { padding: 10px; }
      </style>
    </head>
    <body>
      <h1>Free AI Agent</h1>
      <div id="chat"></div>
      <input id="input" type="text" placeholder="Type your message">
      <button onclick="sendMessage()">Send</button>
      <script>
        // Configure API URL - change this to your deployed backend URL
        const API_URL = 'http://localhost:8000/generate';

        async function sendMessage() {
          const input = document.getElementById('input');
          const chat = document.getElementById('chat');
          const prompt = input.value;
          if (!prompt) return;
          chat.innerHTML += '<p><strong>You:</strong> ' + prompt + '</p>';
          input.value = '';
          try {
            const response = await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt, provider: 'g4f' })
            });
            const data = await response.json();
            chat.innerHTML += '<p><strong>AI:</strong> ' + (data.response || data.error) + '</p>';
          } catch (error) {
            chat.innerHTML += '<p><strong>Error:</strong> ' + error.message + '</p>';
          }
          chat.scrollTop = chat.scrollHeight;
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("AI Agent web app running on port 3000");
  console.log("Visit http://localhost:3000 to use the embeddable AI agent");
});