import { promises as fsPromises } from "node:fs";
import * as path from "node:path";

import { generateScopes, getRegistery, GrammarScopeName } from "./gen_record";
import type { IGrammar } from "vscode-textmate";

const syntaxes_root = "syntaxes/";
const generatedFolder = `${syntaxes_root}fixtures/generated`;
const baselineFolder = `${syntaxes_root}fixtures/baselines`;
const casesFolder = `${syntaxes_root}fixtures/cases`;

async function checkFileExists(file: string): Promise<boolean> {
  try {
    await fsPromises.access(file, fsPromises.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureCleanGeneratedFolder(): Promise<void> {
  if (await checkFileExists(generatedFolder)) {
    for (const f of await fsPromises.readdir(generatedFolder)) {
      await fsPromises.unlink(path.join(generatedFolder, f));
    }
    await fsPromises.rmdir(generatedFolder);
  }
  await fsPromises.mkdir(generatedFolder);
}

/**
 * @param {string} c
 * @param {IGrammar} grammar
 * @return {Promise<[string, string]>}
 */
async function generateAndWrite(
  c: string,
  grammar: IGrammar,
): Promise<[string, string]> {
  const caseText = await fsPromises.readFile(path.join(casesFolder, c), {
    encoding: "utf8",
  });

  const generatedText = generateScopes(caseText, grammar);
  const caseName = path.parse(c);
  const recordName = `${caseName.name}.record.txt`;
  await fsPromises.writeFile(
    path.join(generatedFolder, recordName),
    generatedText,
  ); // write generated text

  return [recordName, generatedText];
}

async function getGrammar() {
  const grammar = await (
    await getRegistery()
  ).loadGrammar(GrammarScopeName.elisp);
  if (grammar === null) {
    throw new TypeError(
      "the loading result of grammar is null, expected vt.IGrammar",
    );
  }
  return grammar;
}

export {
  ensureCleanGeneratedFolder,
  getGrammar,
  checkFileExists,
  generateAndWrite,
  generatedFolder,
  baselineFolder,
  casesFolder,
};
