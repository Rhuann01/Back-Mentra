import { getGeminiRes } from "../gemini/config.js";
import { readFile } from "node:fs";

let text;
let text2;

readFile("./src/public/prompt.txt", "utf-8", (err, data) => {
  if (err) throw err;

  // console.log(data);
  text = data;
});

readFile("./src/public/prompt2.txt", "utf-8", (err, data) => {
  if (err) throw err;

  text2 = data;
});

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
