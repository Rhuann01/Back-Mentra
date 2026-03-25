import { getGeminiRes } from "../gemini/config.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let text;
let text2;

try {
  text = fs.readFileSync(path.join(__dirname, "../public/prompt.txt"), "utf-8");
  text2 = fs.readFileSync(path.join(__dirname, "../public/prompt2.txt"), "utf-8");
} catch (err) {
  console.error("Erro ao ler arquivos", err.message);
}


export async function geminiController(req, res) {
  try {
    const { codigo, linguagem, patente, desafio } = req.body;

    const codigoString = Array.isArray(codigo)
      ? codigo
          .map((file) => `---arquivo: ${file.name} --${file.codigo}`)
          .join("\n\n")
      : codigo;

    const prompt =
      text2 +
      `
    
      linguagem: ${linguagem}
      patente: ${patente}
      desafio: ${desafio}
      codigo: ${codigoString}

      `;

    const result = await getGeminiRes(prompt);

    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ error: "não foi possivel fazer isso", detalhes: err.message });
  }
}

export async function chanlegerController(req, res) {
  try {
    const { patente, linguagem } = req.body;

    const prompt =
      text +
      `
        patente: ${patente}
        linguagem: ${linguagem}
    `;

    // console.log(prompt)

    const result = await getGeminiRes(prompt);
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({ erro: "Não foi possivel continuar", erroMsg: err.message });
  }
}
