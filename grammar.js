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
      alias(repeat($._expr), $.sentence)
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

    word: $ => prec.right(choice(
      /[a-zA-Z_\+\*\/%@#$!\^&|\.?,><=~{}:][a-zA-Z0-9_\-\+\*\/%@#$!\^&|\.?,><=~{}:]*/,
      seq("-", optional(/[a-zA-Z_\+\*\/%@#$!\^&|\.?,><=~{}:][a-zA-Z0-9_\-\+\*\/%@#$!\^&|\.?,><=~{}:]*/,))
    )),
    symbol: $ => seq("'", $.word),

    block: $ => seq(
      "[",
      field("content", alias(repeat($._expr), $.sentence)),
      "]"
    ),

    comment: $ => seq(
      "(",
      choice(repeat(/[^()]/), $.comment),
      ")"
    ),
    string_escape: $ => seq(
      '\\', choice('"', '\\', 'n', 'e', 'r', 't'),
    ),
    string: $ => seq(
      '"',
      field("string_content",
        repeat(
          choice(
            /[^"\\]/,
            $.string_escape
          )
        )
      ),
      '"'
    ),

    raw_string_content: $ => /[^`]*/,
    raw_string: $ => seq(
      '`',
      $.raw_string_content,
      '`'
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
