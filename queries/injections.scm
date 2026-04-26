((raw_string
  (raw_string_content) @injection.content)
  .
  (word) @_word
  (#any-of? @_word "~new" "|~" "|~matches" "|~split")
  (#set! injection.language "regex"))
