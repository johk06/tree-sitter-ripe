import XCTest
import SwiftTreeSitter
import TreeSitterRipe

final class TreeSitterRipeTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ripe())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Ripe grammar")
    }
}
