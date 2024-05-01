grammar.build:
	bun syntaxes/scripts/build_grammar.ts

grammar.test:
	node syntaxes/scripts/test_grammar.mjs

grammar.diff:
	diff syntaxes/fixtures/baselines syntaxes/fixtures/generated

grammar.accept:
	npx copyfiles -u 3 "syntaxes/fixtures/generated/*" syntaxes/fixtures/baselines

syntaxes/scripts/gen_record.mjs: syntaxes/scripts/gen_record.mts
	npx tsc -p syntaxes/scripts/tsconfig.json
