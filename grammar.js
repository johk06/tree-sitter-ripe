/**
 * @file Ripe grammar for tree-sitter
 * @author Jhk <jhk06@mailbox.org>
 * @license GPL
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "ripe",

  extras: $ => [
    $.comment,
    /\s/
  ],

  rules: {
    // TODO: add the actual grammar rules
    program: $ => seq(
      optional($.shebang),
      repeat($._expr),
    ),
    shebang: $ => token(seq(
      '#!', /[^\n]*/
    )),

    _expr: $ => choice(
      $.number,
      $.word,
      $.symbol,
      $.block,
      $.string,
      $.raw_string
    ),

    word: $ => /[a-zA-Z_\-\+\*\/%@#$!\^&|\.?,><=~{}:][a-zA-Z0-9_\-\+\*\/%@#$!\^&|\.?,><=~{}:]*/,
    symbol: $ => seq("'", $.word),

    block: $ => seq(
      "[", repeat($._expr), "]",
    ),

    comment: $ => (seq(
      "(",
      repeat(choice(
        /[^()]+/,
        $.comment
      )),
      ")"
    )),
    string: $ => seq(
      '"',
      repeat(choice(
        /[^"\\]/,
        /\\./
      )),
      '"'
    ),
    raw_string: $ => seq(
      '`', /[^`]*/, '`'
    ),
    number: $ => token(seq(
      optional('-'),
      choice(
        /0x[0-9a-fA-F+/]/,
        /0o[0-9]/,
        /\d+(\.\d+)?([eE][+-]?\d+)?/
      )
    ))
  }
});
