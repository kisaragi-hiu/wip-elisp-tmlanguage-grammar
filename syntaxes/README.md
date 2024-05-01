# Grammars

The steps:

- Modify the base grammar file, which is the YAML file.
- build the grammar: syntaxes/scripts/build_grammar.mjs
- test the grammar: syntaxes/scripts/test_grammar.mjs
- check the difference: cross-env diff syntaxes/fixtures/baselines syntaxes/fixtures/generated
- accept or reject: accept with copyfiles -u 3 \"syntaxes/fixtures/generated/*\" syntaxes/fixtures/baselines
