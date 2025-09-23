import dotenv from 'dotenv';
dotenv.config()


const apiKey = process.env.API_KEY;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: apiKey});
let conversacion = []

async function petrista() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "",
  });
  console.log(response.text);
}

async function uribista() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "",
  });
  console.log(response.text);
}

function turno(){
    
}

await petrista();