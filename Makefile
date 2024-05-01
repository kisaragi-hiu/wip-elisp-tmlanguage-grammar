build:
	bun syntaxes/scripts/build_grammar.ts

test:
	bun syntaxes/scripts/test_grammar.ts

diff:
	diff syntaxes/fixtures/baselines syntaxes/fixtures/generated

accept:
	npx copyfiles -u 3 "syntaxes/fixtures/generated/*" syntaxes/fixtures/baselines
