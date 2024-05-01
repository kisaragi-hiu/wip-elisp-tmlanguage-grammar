grammar.build:
	node syntaxes/scripts/build_grammar.mjs

grammar.test:
	node syntaxes/scripts/test_grammar.mjs

grammar.diff:
	npx cross-env diff syntaxes/fixtures/baselines syntaxes/fixtures/generated

grammar.accept:
	copyfiles -u 3 "syntaxes/fixtures/generated/*" syntaxes/fixtures/baselines

syntaxes/scripts/gen_record.mjs: syntaxes/scripts/gen_record.mts
	npx tsc -p syntaxes/scripts/tsconfig.json
