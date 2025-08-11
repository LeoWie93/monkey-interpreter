
import assert from "node:assert";
import { describe, test } from "node:test";
import { TOKEN_TYPES, type Token, newToken } from "../token/token.ts";
import { newLexer, nextTokenFromLexer, type Lexer } from "../lexer/lexer.ts";

describe("Lexer", () => {
    test('Just tokens', (t) => {
        const input: string = "+=(){},;";

        const expectedTokens: Token[] = [
            newToken(TOKEN_TYPES.PLUS, "+"),
            newToken(TOKEN_TYPES.ASSIGN, "="),
            newToken(TOKEN_TYPES.LPAREN, "("),
            newToken(TOKEN_TYPES.RPAREN, ")"),
            newToken(TOKEN_TYPES.LBRACE, "{"),
            newToken(TOKEN_TYPES.RBRACE, "}"),
            newToken(TOKEN_TYPES.COMMA, ","),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
        ];

        const lexer: Lexer = newLexer(input);

        for (let expected of expectedTokens) {
            let currentToken: Token = nextTokenFromLexer(lexer);

            assert.equal(currentToken.type, expected.type);
            assert.equal(currentToken.literal, expected.literal);
        }
    });


    test('Structure Test', (t) => {
        const input: string = `let five = 5;
        let ten = 10;
        let add = fn(x, y) {
            x + y;
        };
        let result = add(five, ten);
        `;

        const expectedTokens: Token[] = [
            newToken(TOKEN_TYPES.LET, "let"),
            newToken(TOKEN_TYPES.IDENT, "five"),
            newToken(TOKEN_TYPES.ASSIGN, "="),
            newToken(TOKEN_TYPES.INT, "5"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.LET, "let"),
            newToken(TOKEN_TYPES.IDENT, "ten"),
            newToken(TOKEN_TYPES.ASSIGN, "="),
            newToken(TOKEN_TYPES.INT, "10"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.LET, "let"),
            newToken(TOKEN_TYPES.IDENT, "add"),
            newToken(TOKEN_TYPES.ASSIGN, "="),
            newToken(TOKEN_TYPES.FUNCTION, "fn"),
            newToken(TOKEN_TYPES.LPAREN, "("),
            newToken(TOKEN_TYPES.IDENT, "x"),
            newToken(TOKEN_TYPES.COMMA, ","),
            newToken(TOKEN_TYPES.IDENT, "y"),
            newToken(TOKEN_TYPES.RPAREN, ")"),
            newToken(TOKEN_TYPES.LBRACE, "{"),
            newToken(TOKEN_TYPES.IDENT, "x"),
            newToken(TOKEN_TYPES.PLUS, "+"),
            newToken(TOKEN_TYPES.IDENT, "y"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.RBRACE, "}"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.LET, "let"),
            newToken(TOKEN_TYPES.IDENT, "result"),
            newToken(TOKEN_TYPES.ASSIGN, "="),
            newToken(TOKEN_TYPES.IDENT, "add"),
            newToken(TOKEN_TYPES.LPAREN, "("),
            newToken(TOKEN_TYPES.IDENT, "five"),
            newToken(TOKEN_TYPES.COMMA, ","),
            newToken(TOKEN_TYPES.IDENT, "ten"),
            newToken(TOKEN_TYPES.RPAREN, ")"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
        ];

        const lexer: Lexer = newLexer(input);

        for (let expected of expectedTokens) {
            let currentToken: Token = nextTokenFromLexer(lexer);

            assert.equal(currentToken.type, expected.type);
            assert.equal(currentToken.literal, expected.literal);
        }
    });
});
