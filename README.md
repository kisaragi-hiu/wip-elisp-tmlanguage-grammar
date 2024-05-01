# WIP TextMate / VSCode grammar for Emacs Lisp

This will provide a syntax for Emacs Lisp suitable for highlighting via Shiki, or perhaps consumption by some hypothetical VSCode plugin for Emacs Lisp.

## Design

See [the Design section of qingpeng9802/vscode-common-lisp's README](https://github.com/qingpeng9802/vscode-common-lisp#design).

Emacs Lisp is similar enough to Common Lisp that the overall structure can probably be reused. However, there are many differences in which symbols are provided, as well as the lack of namespaces.
  
## Acknowledgment

[qingpeng9802/vscode-common-lisp](https://github.com/qingpeng9802/vscode-common-lisp)'s excellent grammar.

The original acknowledgement of qingpeng9802/vscode-common-lisp: [CL-ANSI Standard Draft](https://franz.com/support/documentation/cl-ansi-standard-draft-w-sidebar.pdf), [Common Lisp HyperSpec](https://www.lispworks.com/documentation/HyperSpec/Front/), [vscode-scheme](https://github.com/sjhuangx/vscode-scheme), [Scheme.tmLanguage](https://github.com/egrachev/sublime-scheme/blob/master/Scheme.tmLanguage), [Lisp.tmLanguage](https://github.com/bradrobertson/sublime-packages/blob/master/Lisp/Lisp.tmLanguage), [regex101](https://regex101.com/), OSS license from [structure101](https://structure101.com/)  

## Todos

- Add Emacs Lisp cases to syntaxes/fixtures/cases. Include a variety of syntax:
  - A compiled file
  - A normal function and macro
  - cl-lib, cl-loop
  - `format`
