((raw_string
  (raw_string_content) @injection.content)
  (word) @_word
  (#eq? @_word "~new")
  (#set! injection.language "regex"))
