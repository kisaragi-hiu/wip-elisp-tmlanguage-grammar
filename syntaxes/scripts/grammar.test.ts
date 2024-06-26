import { describe, it } from "bun:test";
import assert from "node:assert";
import { readFile, readdir } from "node:fs/promises";
import * as path from "node:path";
import type { IGrammar } from "vscode-textmate";

import {
  baselineFolder,
  casesFolder,
  checkFileExists,
  ensureCleanGeneratedFolder,
  generateAndWrite,
  getGrammar,
} from "./test_util";

async function assertMatchBaseline(recordName: string, generatedText: string) {
  const baselineFile = path.join(baselineFolder, recordName);

  if (await checkFileExists(baselineFile)) {
    const baselineText = await readFile(baselineFile, {
      encoding: "utf8",
    });

    assert.strictEqual(
      generatedText,
      baselineText,
      `Expected [${recordName}]'s baseline to match.`,
    );
  } else {
    assert(false, "Baseline not found.");
  }
}

function testIfMatchOn(cases: string[], grammar: IGrammar) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe("generating and comparing records", () => {
    for (const c of cases) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(`[${c}] record matching`, async () => {
        const [recordName, generatedText] = await generateAndWrite(c, grammar);
        await assertMatchBaseline(recordName, generatedText);
      });
    }
  });
}

async function generateRecordsFor(cases: string[] = []) {
  const allCases = await readdir(casesFolder);
  let needCases: string[] = [];

  if (cases.length !== 0) {
    const allCasesSet = new Set(allCases);
    // {name: fullNameBase}
    const allCaseNamesMap = new Map();
    for (const c of allCases) {
      allCaseNamesMap.set(path.parse(c).name, c);
    }

    for (const c of cases) {
      if (allCasesSet.has(c)) {
        needCases.push(c);
      } else if (allCaseNamesMap.has(c)) {
        needCases.push(allCaseNamesMap.get(c));
      }
    }
  } else {
    needCases = allCases;
  }

  await ensureCleanGeneratedFolder();
  testIfMatchOn(needCases, await getGrammar());
}

await generateRecordsFor(process.argv.slice(2));
