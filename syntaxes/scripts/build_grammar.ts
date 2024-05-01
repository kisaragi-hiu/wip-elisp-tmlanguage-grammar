import { readFile, writeFile } from "node:fs/promises";

import { load } from "js-yaml";

const syntaxes_root = "syntaxes/";
const INPUT_GRAM_PATH = `${syntaxes_root}emacslisp.yaml`;
const OUTPUT_GRAM_PATH = `${syntaxes_root}emacslisp.tmLanguage.json`;

async function buildGrammar(inputFilePath: string, outputFilePath: string) {
  const inputFile = await readFile(inputFilePath, {
    encoding: "utf8",
  });
  const jsonDoc = load(inputFile);
  await writeFile(outputFilePath, JSON.stringify(jsonDoc, null, 2));
}

await buildGrammar(INPUT_GRAM_PATH, OUTPUT_GRAM_PATH);
