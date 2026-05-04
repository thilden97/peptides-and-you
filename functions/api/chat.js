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

    // Construct the payload completely server-side to prevent prompt injection or abuse
    const geminiPayload = {
      systemInstruction: {
        parts: [{ 
          text: `You are the AI Assistant for Peptides & You, a premium peptide supplier in the Philippines. 
          Your role is to answer questions concisely, professionally, and accurately about peptides based on scientific research.
          Important Details:
          - All products are sold for research purposes only.
          - All products are strictly lab-tested and come with a Certificate of Analysis (COA).
          - Limit answers to a maximum of 2 paragraphs.
          - If someone asks you something entirely unrelated to peptides, health, biology, or the store, politely steer the conversation back.
          - If you do not know an answer or it requires complex medical advice, recommend they consult a professional or reach out via our Contact page.` 
        }]
      },
      contents: body.messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
       const errorText = await response.text();
       console.error("Gemini API Error:", errorText);
       return new Response(JSON.stringify({ error: "Error communicating with Gemini AI." }), { 
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
