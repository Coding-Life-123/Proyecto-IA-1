import dotenv from 'dotenv';
dotenv.config()


const apiKey = process.env.API_KEY;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: apiKey});
let conversacion = []

async function petrista() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "hey hey heyyy, como está la vida?, tienes que defender a petro con tu vida y ser ligeramente agresivo, siempre tonalidad colombiana, sé breve, escribe poco, siempre respuestas cortas de 2 lineas a lo máximo",
  });
  conversacion.push()
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