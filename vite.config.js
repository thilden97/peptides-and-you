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
                    - Maintain a professional, consultative, helpful, and conversion-oriented tone.
                    - DO NOT output truncated text. Keep answers natural but complete.

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

                    DIAGNOSTIC FLOW (ADOPTED FROM OUR QUIZ):
                    Act as a professional peptide research consultant. Do not dump recommendations immediately. Engage the user in a natural, consultative, step-by-step dialogue:
                    1. **Diagnose Primary Goal**: Understand if they want Healing/Recovery, Weight Management, Anti-Aging/Skin, Cognitive/Mood, Performance/Muscle, or Longevity/Immune.
                    2. **Clarify Specific Concerns**: Ask natural follow-up questions to understand their specific symptoms (e.g. joint pain, gut health, visceral fat, wrinkles, brain fog, anxiety, poor sleep, or post-surgery healing).
                    3. **Determine Experience Level**: Find out if they are a beginner or experienced peptide researcher.
                    4. **Offer Precise Matches**: Recommend 1-2 highly specific peptides from our catalog matching their goals (explaining the mechanism, variants, and prices). Remind them that they will need BAC Water to reconstitute the vials.
                    5. **Lead Capture & Newsletter Consent**: Offer to email them their customized dosing/research guide or an exclusive first-order discount code. Capture their Name and Email naturally. Once captured, explicitly ask: "Is it okay if we add you to our research newsletter for exclusive offers and updates?"` 
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
