import dotenv from 'dotenv';
dotenv.config()


const apiKey = process.env.API_KEY;
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: apiKey});
let conversacion = []
let controlVar = false;

async function main(rol, contexto) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [contexto, 'recuerda que '+rol],
  });
  conversacion.push(response.text)
  turno()
}

function turno(){
    if(controlVar){
        main('eres un uribista de extrema derecha, que borracho pelea con un petrista de extrema izquierda, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas', conversacion);
        controlVar = true;
    }else{
        main('eres un petrista de extrema izquierda, que borracho pelea con un uribista de extrema derecha, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas', conversacion);
        controlVar = false;
    }
}

await main();