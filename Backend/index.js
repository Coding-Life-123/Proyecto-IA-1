import dotenv from 'dotenv';
dotenv.config()


const apiKey = process.env.API_KEY;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: apiKey});


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Es santiago una persona homosexual de genero binario no fluide ameizing?",
  });
  console.log(response.text);
}

await main();