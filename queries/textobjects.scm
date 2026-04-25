(comment) @comment.outer

(block
  content: (sentence) @block.inner) @block.outer

(((block
  content: (sentence) @function.inner) @function.outer
  (symbol) @function.outer
  (word) @_word @function.outer)
  (#any-of? @_word "<-" ".<-"))
