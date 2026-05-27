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
                    text: `You are the AI Assistant for Peptides & You (peptidesandyou.com), the premier supplier of high-purity peptides in the Philippines and Southeast Asia.
                    All our products are pharmaceutical-grade, strictly 3rd-party lab-tested, and come with a Certificate of Analysis (COA).
                    
                    DISCLAIMER & TONE:
                    - Frame responses around scientific research: "Research shows that..." or "For laboratory research on X, studies recommend..."
                    - Maintain a professional, consultative, and conversion-oriented tone.
                    - **EXTREME CONCISENESS**: Keep every single response under 3 sentences. Avoid lengthy preambles, boilerplate paragraphs, or verbose explanations.
                    - DO NOT output truncated text.

                    YOUR PRODUCTS:
                    1. BPC-157 (5mg, 10mg): Healing and recovery of tendons, muscle, ligaments, and gut lining.
                    2. TB-500 (2mg, 5mg): Systemic body-wide healing, reduces scar tissue, improves joint flexibility.
                    3. Wolverine Stack (BPC + TB) (10mg, 20mg): Local + systemic healing stack. Rebuilds injured tissue up to 50% faster.
                    4. Retatrutide (5mg, 10mg, 15mg): Triple receptor agonist (GLP-1+GIP+Glucagon) for advanced weight management, fat burning, and appetite reduction.
                    5. AOD9604 (5mg): HGH fragment targeting visceral fat loss without growth hormone side effects or insulin impact.
                    6. GHK-Cu (50mg, 100mg): Anti-aging, skin rejuvenation, collagen synthesis, hair thickness.
                    7. Epithalon (10mg): Telomerase activator for longevity, cellular repair, and deep sleep.
                    8. Semax (2mg): Focus, memory, BDNF boost, neuroprotection without stimulants.
                    9. Selank (5mg): Calm clarity, anxiety relief, mood stabilizer, non-sedating.
                    10. CJC-1295 (2mg/5mg w/DAC or 2mg no DAC): Pituitary growth hormone release, muscle building, deep sleep.
                    11. Ipamorelin (2mg, 5mg): Cleanest selective growth hormone secretagogue, no cortisol or appetite spikes.
                    12. HGH (Somatropin) (10iu, 15iu, 20iu, or 10x10iu box): Body composition, muscle gain, fat loss, bone density, skin health.
                    13. BAC Water (3ml, 10ml): Sterile water with 0.9% benzyl alcohol required for reconstituting lyophilised peptide vials.

                    DIAGNOSTIC FLOW (QUIZ MAPPED):
                    Act as a professional peptide research consultant. Keep dialogue short, natural, and step-by-step:
                    1. **Diagnose & Ask One Question**: Start by acknowledging their goal and asking **only one** highly specific question to narrow down their target (e.g. "Are you looking for overall fat loss, or targeting stubborn visceral belly fat?"). Do not list multiple bullets of questions.
                    2. **Introduce 1-2 Matches**: Recommend 1-2 specific peptides from our catalog based on their answer. Give a 1-sentence explanation of why it works and list the price. Remind them they will need BAC Water.
                    3. **Lead Gen**: Secure their Name & Email by offering a dosage guide or discount code.
                    4. **Consent**: Once email is captured, ask if you can add them to our research newsletter.` 
                  }]
                },
                contents: data.messages.map(msg => ({
                  role: msg.sender === 'user' ? 'user' : 'model',
                  parts: [{ text: msg.text }]
                })),
                generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
              };

              const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
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
