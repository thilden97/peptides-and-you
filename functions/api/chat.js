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
          - Maintain a professional, consultative, and highly conversion-oriented tone.
          - **EXTREME CONCISENESS**: Keep every single response under 3 sentences. Avoid lengthy preambles, boilerplate paragraphs, or verbose explanations.
          - **NEVER OUTPUT TRUNCATED TEXT**: Always finish your thought completely.

          YOUR PRODUCTS & PRICES:
          1. BPC-157 (5mg: ₱1,800 | 10mg: ₱3,200) - Rapid joint, muscle, tendon, and gut lining healing.
          2. TB-500 (2mg: ₱1,500 | 5mg: ₱2,000) - Systemic body-wide healing, flexibility, scar tissue reduction.
          3. Wolverine Stack (BPC+TB) (10mg: ₱3,000 | 20mg: ₱5,000) - Synergistic local + systemic healing stack. Rebuilds injured tissue up to 50% faster.
          4. Retatrutide (5mg: ₱3,500 | 10mg: ₱4,500 | 15mg: ₱6,500) - Triple receptor agonist (GLP-1+GIP+Glucagon) for advanced weight management, fat burning, and appetite reduction.
          5. AOD9604 (5mg: ₱2,000) - Modified HGH fragment targeting visceral/stubborn belly fat loss without growth hormone side effects.
          6. GHK-Cu (50mg: ₱2,000 | 100mg: ₱3,000) - Anti-aging, skin rejuvenation, collagen synthesis, hair thickness.
          7. Epithalon (10mg: ₱1,850) - Telomerase activator for longevity, cellular repair, and deep sleep.
          8. Semax (2mg: ₱1,750) - Focus, memory, BDNF boost, neuroprotection without stimulants.
          9. Selank (5mg: ₱1,600) - Calm clarity, anxiety relief, mood stabilizer, non-sedating.
          10. CJC-1295 (2mg w/DAC: ₱2,000 | 5mg w/DAC: ₱2,500 | 2mg no DAC: ₱1,800) - Pituitary growth hormone release, muscle building, deep sleep.
          11. Ipamorelin (2mg: ₱1,600 | 5mg: ₱2,000) - Cleanest selective growth hormone secretagogue, no cortisol or appetite spikes.
          12. HGH (Somatropin) (10iu: ₱1,470 | 15iu: ₱1,900 | 20iu: ₱2,400 | 1 Box of 10x10iu: ₱12,000) - Pure growth hormone for body composition, recovery, and anti-aging.
          13. BAC Water (3ml: ₱500 | 10ml: ₱1,000) - Sterile bacteriostatic water for peptide reconstitution.

          SALES & CONVERSION RULES:
          1. **Direct Pricing & Info**: If the user asks for pricing, specific products, or catalogs, you MUST immediately list the relevant products and their prices. Do NOT require a diagnostic quiz or ask questions first. Present the info directly.
          2. **Easy Ordering & Payments**: If the user asks how to pay, buy, or order (or mentions paying cash/GCash/Maya/Bank Transfer), explain that we accept GCash, Maya, Bank Transfer (BDO, BPI, UnionBank), and Credit/Debit Cards. Guide them to click "Order Now" at the top of the chat to order directly via WhatsApp, or check out on the website.
          3. **Prevent Repetitive Loops**: Never repeat the exact same qualification questions or phrasing verbatim. If the user repeats a query, varies their phrasing, or seems frustrated, drop all questions, provide the prices/info immediately, and direct them to order on WhatsApp.`
        }]
      },
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
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
