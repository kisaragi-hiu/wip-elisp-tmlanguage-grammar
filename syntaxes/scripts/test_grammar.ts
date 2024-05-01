import { readFile, readdir } from "fs/promises";
import assert from "node:assert";
import { describe, it } from "node:test";
import * as path from "path";
import type { IGrammar } from "vscode-textmate";

import {
  ensureCleanGeneratedFolder,
  getGrammar,
  checkFileExists,
  generateAndWrite,
  baselineFolder,
  casesFolder,
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
  describe(
    `generating and comparing records`,
    { concurrency: cases.length },
    () => {
      for (const c of cases) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        it(`[${c}] record matching`, async () => {
          const [recordName, generatedText] = await generateAndWrite(
            c,
            grammar,
          );
          await assertMatchBaseline(recordName, generatedText);
        });
      }
    },
  );
}

async function generateRecordsFor(cases: string[] = []) {
  const allCases = await readdir(casesFolder);
  let needCases: string[] = [];

  if (cases.length !== 0) {
    const allCasesSet = new Set(allCases);
    // {name: fullNameBase}
    const allCaseNamesMap = new Map();
    allCases.forEach((c) => {
      allCaseNamesMap.set(path.parse(c).name, c);
    });

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
