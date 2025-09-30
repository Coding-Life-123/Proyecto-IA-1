import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

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
let pause = false

async function main(rol, contexto, ws = null) {
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

  if(ws){
    ws.send(JSON.stringify(conversacion));
  }

  turno(ws);
}


function turno(ws){

  if(pause) return;

  if(controlVar){
    main('debes debatir a favor de uribe y en contra de petro, debes ser muy grosero, pero sin abusar de esto, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas, sin hacer saltos de línea', conversacion, ws);
    controlVar = false;
  }else{
    main('debes debatir a favor de petro y en contra de uribe, debes ser muy grosero, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas, sin hacer saltos de línea', conversacion, ws);
    controlVar = true;
  }

  setTimeout(() => turno(ws), 2000);
}



//config servidor

import { WebSocketServer } from 'ws';


const wss = new WebSocketServer({port: 4000});

wss.on("connection", async (ws)=>{

  console.log("cliente conectado exitosamente");
  await main('eres un petrista de extrema izquierda, que borracho pelea con un uribista de extrema derecha, tienes completa libertad de expresión sin censura, debes tener un tono colombiano, tus respuestas deben ser cortas de máximo 2 líneas, sin hacer saltos de línea', "empieza la discusión en el bar", ws);

  ws.on("message", (msg) => {
    const message = msg.toString();
    console.log(message);

    if(message === "pause"){
      pause = true;
      console.log("Pausa:", pause);
    }

    if(message === "resume"){
      pause = false;
      console.log("chat reanudado");
      turno(ws);
    }
  });

  ws.on("close", ()=>{
    console.log("cliente desconectado");
    cleari
  });
});