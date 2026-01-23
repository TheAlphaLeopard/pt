# AI Agent Web App

This project provides an embeddable AI agent for websites, using g4f for free AI responses.

## Features

- Web-based chat interface
- Embeds easily into any website
- Uses free AI models via g4f
- CORS enabled for cross-origin access

## Installation

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Running the Project

1. Start the Python AI API backend:
   ```bash
   python main.py
   ```

2. Start the Node.js web app:
   ```bash
   npm start
   ```

3. Visit `http://localhost:3000` to use the AI agent chat interface.

## Embedding in Your Website

To embed the AI agent chat widget into your website, copy and paste the following HTML code into your webpage. For local development, ensure your website is served from the same origin as the backend (e.g., both on localhost). For production, update the `API_URL` to your deployed backend URL.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Your Website</title>
  <style>
    .ai-chat-widget { font-family: Arial, sans-serif; margin: 20px; }
    #ai-chat { border: 1px solid #ccc; height: 300px; overflow-y: scroll; padding: 10px; }
    #ai-input { width: 80%; padding: 10px; }
    #ai-send { padding: 10px; }
  </style>
</head>
<body>
  <!-- Your website content -->

  <!-- AI Chat Widget -->
  <div class="ai-chat-widget">
    <h2>AI Assistant</h2>
    <div id="ai-chat"></div>
    <input id="ai-input" type="text" placeholder="Ask me anything...">
    <button id="ai-send" onclick="sendMessage()">Send</button>
  </div>

  <script>
    // Configure API URL - change this to your deployed backend URL
    const API_URL = 'http://localhost:8000/generate';

    async function sendMessage() {
      const input = document.getElementById('ai-input');
      const chat = document.getElementById('ai-chat');
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
```

### Notes for Local Embedding
- If your website is hosted remotely, the fetch to `localhost:8000` will fail due to CORS and security policies.
- For local testing, serve your website from a local server (e.g., using `python -m http.server` or similar) on a different port.
- The backend must be running on `localhost:8000` for the widget to work locally.

### For Production Deployment
- Deploy the Python backend to a cloud service (e.g., Vercel, Heroku).
- Update the `API_URL` in the script to the deployed URL.
- Ensure CORS is configured to allow requests from your website's domain.

## API Usage

The backend API is available at `http://localhost:8000/generate` with POST requests containing:
```json
{
  "prompt": "Your message",
  "provider": "g4f"
}
```
