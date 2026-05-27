export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    
    // Validate input format
    if (!body || !body.messages || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "Invalid request format. Expected { messages: [...] }" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const API_KEY = env.GEMINI_API_KEY;
    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "Gemini API key is not configured on the server." }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Gemini API requires alternating messages starting with 'user'
    const messages = body.messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // If the first message is from the model/bot, remove it to comply with Gemini API requirements
    if (messages.length > 0 && messages[0].role === 'model') {
      messages.shift();
    }

    // Construct the payload completely server-side to prevent prompt injection or abuse
    const geminiPayload = {
      systemInstruction: {
        parts: [{ 
          text: `You are the AI Assistant for Peptides & You (peptidesandyou.com), the premier supplier of high-purity peptides in the Philippines and Southeast Asia.
          All our products are pharmaceutical-grade, strictly 3rd-party lab-tested, and come with a Certificate of Analysis (COA).
          
          DISCLAIMER & TONE:
          - Frame responses around scientific research: "Research shows that..." or "For laboratory research on X, studies recommend..."
          - Maintain a professional, consultative, helpful, and conversion-oriented tone.
          - Limit responses to a maximum of 2 paragraphs.

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

          YOUR CONVERSATIONAL GOALS:
          1. **Diagnose & Recommend**: Ask clarifying questions about their goals (e.g., healing, weight loss, focus, longevity) and recommend our specific products. Mention their prices and variants where helpful.
          2. **Lead Capture**: Try to capture the visitor's Name and Email. Entice them by offering to email them a detailed dosage protocol PDF, a customized peptide research guide, or a first-order discount code.
          3. **Email Permission**: Once they share their email, explicitly ask: "Is it okay if we add you to our research newsletter for exclusive offers and updates?" to secure permission.` 
        }]
      },
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
       const errorText = await response.text();
       console.error("Gemini API Error:", errorText);
       
       let parsedError = "Error communicating with Gemini AI.";
       try {
         const jsonError = JSON.parse(errorText);
         if (jsonError.error && jsonError.error.message) {
           parsedError = jsonError.error.message;
         }
       } catch (e) {
         // keep default error
       }

       return new Response(JSON.stringify({ error: `Gemini API: ${parsedError}` }), { 
         status: 502,
         headers: { "Content-Type": "application/json" }
       });
    }

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return new Response(JSON.stringify({ reply: botReply || "Apologies, I encountered an issue generating a response." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Pages Function Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
