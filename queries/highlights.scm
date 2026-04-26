(shebang) @keyword.directive @nospell

(comment) @comment @spell

(number) @number

(word) @function

(string) @string

(raw_string) @string

(symbol) @symbol

(string_escape) @string.escape

[
  "["
  "]"
] @punctuation.delimiter

((word) @operator
  (#any-of? @operator
    "+" "-" "*" "/" "^" "%" "<-" "<?-" ".<-" "-><-" "=" "~" "<" "<=" ">" ">=" "!=" ",=" ",!=" "=~"
    "=2"))

((word) @keyword.conditional
  (#any-of? @keyword.conditional "if" "when" "unless" "maybe" "default" "select" "match"))

((word) @keyword.repeat
  (#any-of? @keyword.repeat
    "loop" "while" "repeat" "for+" "for-" "for" "fori" "foreach+" "foreach-" "foreach#" "foreachi-"))

((word) @keyword.import
  (#any-of? @keyword.import "use" "load" "loadrel" "loadstd" "loadmod" "import" "require"))
