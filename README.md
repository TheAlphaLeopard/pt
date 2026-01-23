# AI Agent Web App

This project provides an embeddable AI agent for websites, using GPT4Free.js for free AI responses directly in the browser.

## Features

- Web-based chat interface
- Embeds easily into any website
- Uses free AI models via GPT4Free.js
- No backend required - runs entirely client-side

## Local Development

Simply open `public/index.html` in your browser to test the chat interface locally.

## Embedding in Your Website

To embed the AI agent chat widget into your website, copy and paste the following HTML code into your webpage. The AI runs directly in the browser using GPT4Free.js, so no backend is required.

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

  <script type="module">
    import Client from 'https://g4f.dev/dist/js/client.js';

    const client = new Client();

    window.sendMessage = async function() {
      const input = document.getElementById('ai-input');
      const chat = document.getElementById('ai-chat');
      const prompt = input.value;
      if (!prompt) return;
      chat.innerHTML += '<p><strong>You:</strong> ' + prompt + '</p>';
      input.value = '';
      try {
        const result = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }]
        });
        chat.innerHTML += '<p><strong>AI:</strong> ' + result.choices[0].message.content + '</p>';
      } catch (error) {
        chat.innerHTML += '<p><strong>Error:</strong> ' + error.message + '</p>';
      }
      chat.scrollTop = chat.scrollHeight;
    };
  </script>
</body>
</html>
```

### Features
- **Agentic AI**: The AI can respond conversationally and perform tasks directly in the browser.
- **No Backend Required**: Everything runs client-side, making it easy to embed.
- **Free and Open**: Uses GPT4Free.js for free AI access.

## Deployment to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```
   Follow the prompts to set up the project.

4. After deployment, the chat interface will be available at the URL (e.g., `https://agentig.vercel.app`).
