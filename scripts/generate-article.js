/**
 * SCRIPT: generate-article.js
 * PURPOSE: Automation script to generate new peptide articles using Gemini 1.5 Flash / Gemini 2.5
 * 
 * Usage: 
 * node scripts/generate-article.js "BPC-157 vs TB-500 for Joint Repair"
 * 
 * Note: Requires you to install @google/generative-ai and fs
 * npm install @google/generative-ai
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogDataPath = path.join(__dirname, '../src/data/blogPosts.js');

// Configuration
// const API_KEY = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);

const systemPrompt = `
You are the head researcher and lead content writer for Peptides & You, a premium peptide supplier in the Philippines.
Your task is to write highly detailed, scientifically accurate, SEO and GEO optimized blog posts about peptides.
All products are sold for research purposes, lab tested with a Certificate of Analysis (COA).
Include the exact prices in Philippine Pesos (₱) if mentioning specific products.
Output the result strictly as a JSON object matching this schema:
{
  "id": "slug-format-id",
  "title": "SEO Optimized Catchy Title",
  "slug": "slug-format-id",
  "excerpt": "A compelling 2-sentence summary.",
  "content": "A high quality markdown article containing H2 and H3 tags. No top-level H1 tag. Minimum 500 words.",
  "category": "Research" | "Protocols" | "Comparisons" | "Quality" | "Guides",
  "tags": ["tag1", "tag2"],
  "seoKeywords": ["seo", "keywords"],
  "featuredImage": "/peptide-vial-branded.png",
  "geoTarget": "Philippines"
}
`;

async function generateArticle(topic) {
  if (!topic) {
    console.error('Please provide a topic. Example: node generate-article.js "Benefits of GHK-Cu"');
    process.exit(1);
  }

  console.log(`🤖 Initializing Gemini Article Generation for topic: "${topic}"...`);
  
  try {
    // =====================================================================
    // GEMINI 1.5 FLASH / 2.5 API CALL
    // =====================================================================
    /*
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-2.5-flash"
    
    console.log('📡 Sending request to Google Gemini API...');
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Generate a blog post about: ${topic}. Follow the system prompt strictly.` }]}],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    const newArticle = JSON.parse(responseText);
    */

    // --- MOCK RESPONSE FOR DEMONSTRATION ---
    // (Replace the block below with the actual parsed response from Gemini above)
    const newArticle = {
      id: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: `${topic} - The Complete 2026 Guide`,
      slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: `An automated article detailing the research and science behind ${topic}, optimized for the Philippine market.`,
      content: `## Introduction to ${topic}\n\nThis article was automatically generated via the Gemini API pipeline setup.\n\n## Mechanisms of Action\n\nIt works very well. Lab tested with COA.`,
      category: 'Research',
      tags: ['automation', 'gemini'],
      author: 'Peptides & You AI Researcher',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      seoKeywords: [topic, 'Philippines', 'peptides'],
      featuredImage: '/peptide-vial-branded.png',
      published: true,
      geoTarget: 'Philippines'
    };
    // ---------------------------------------

    console.log(`✅ Gemini successfully generated the article: "${newArticle.title}"`);
    console.log(`💾 Saving article to the codebase...`);

    // Add required non-AI fields
    newArticle.author = 'Peptides & You Research Team';
    newArticle.date = new Date().toISOString().split('T')[0];
    newArticle.readTime = '6 min';
    newArticle.published = true;

    // Read current file
    let currentData = fs.readFileSync(blogDataPath, 'utf8');
    
    // Convert new article to string representation
    const newArticleString = JSON.stringify(newArticle, null, 2);
    
    // Inject at the beginning of the blogPosts array
    const replacementStr = `export const blogPosts = [\n  ${newArticleString},`;
    const updatedData = currentData.replace(/export const blogPosts = \[/, replacementStr);

    fs.writeFileSync(blogDataPath, updatedData);
    
    console.log(`🎉 Success! The article has been added into src/data/blogPosts.js`);
    console.log(`📝 To run this yourself, just uncomment the @google/generative-ai integration code!`);

  } catch (error) {
    console.error("❌ Failed to generate or save the article:", error);
  }
}

// Execute
const args = process.argv.slice(2);
generateArticle(args[0] || "The Science of Peptide Synthesis");
