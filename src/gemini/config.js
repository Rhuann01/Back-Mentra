import { GoogleGenAI } from "@google/genai";

const KEY = process.env.KEY;
const ai = new GoogleGenAI({ apiKey: KEY });

export async function getGeminiRes(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  // return result.response.text();
  return result.text;
}
