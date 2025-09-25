import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import express from 'express'

// Para que siempre busque desde la raíz del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({path: resolve(__dirname, "../.env")})


const apiKey = process.env.API_KEY;

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);
let conversacion = []
let controlVar = true;
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function main(rol, contexto) {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: `${contexto}\nRecuerda que ${rol}` }]
      }
    ],
  });
    const texto = result.response.candidates[0].content.parts[0].text;
  conversacion.push(texto);
  console.log(conversacion);

  turno();
}

function turno(){
    if(controlVar){
        main('debes debatir a favor de uribe y en contra de petro, debes ser muy grosero, pero sin abusar de esto, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas, sin hacer saltos de línea', conversacion);
        controlVar = false;
    }else{
        main('debes debatir a favor de petro y en contra de uribe, debes ser muy grosero, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas, sin hacer saltos de línea', conversacion);
        controlVar = true;
    }
}

await main('eres un petrista de extrema izquierda, que borracho pelea con un uribista de extrema derecha, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas, sin hacer saltos de línea', "empieza la discusión en el bar");


//config servidor