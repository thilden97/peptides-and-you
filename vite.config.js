import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local Development Proxy for Cloudflare Pages Functions
// This allows 'npm run dev' to mock the /api/chat functionality securely without exposing keys to the client
const cloudflareFunctionsMock = () => {
  return {
    name: 'cloudflare-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString() });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              
              // For local dev: set GEMINI_API_KEY in a .env file or environment variable
              // In production: Cloudflare Pages uses env.GEMINI_API_KEY from the dashboard
              const API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE"; 

              const geminiPayload = {
                systemInstruction: {
                  parts: [{ 
                    text: `You are the AI Assistant for Peptides & You, a premium peptide supplier in the Philippines. Answer questions concisely, professionally, and accurately about peptides based on scientific research. All products are sold for research purposes only.` 
                  }]
                },
                contents: data.messages.map(msg => ({
                  role: msg.sender === 'user' ? 'user' : 'model',
                  parts: [{ text: msg.text }]
                })),
                generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
              };

              const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(geminiPayload)
              });

              if (!response.ok) {
                 res.statusCode = 502;
                 res.end(JSON.stringify({ error: "Gemini API failed" }));
                 return;
              }

              const json = await response.json();
              const botReply = json.candidates?.[0]?.content?.parts?.[0]?.text;
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply: botReply }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e.message }));
            }
          });
          return;
        }
        next();
      });
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cloudflareFunctionsMock()],
})
