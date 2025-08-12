
import { describe, it, expect } from 'vitest'
import { TOKEN_TYPES, type Token, newToken } from '../token/token.ts'
import { newLexer, nextTokenFromLexer, type Lexer } from '../lexer/lexer.ts'

describe('Lexer', () => {
    it('Test Tokens', () => {
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
            expect(currentToken.type).toEqual(expected.type);
            expect(currentToken.literal).toEqual(expected.literal);
        }
    });

    it('Test Next Token', () => {
        const input: string = `let five = 5;
        let ten = 10;
        let add = fn(x, y) {
            x + y;
        };

        let result = add(five, ten);

        !-/*5;
        5 < 10 > 5;

        if (5 < 10) {
            return true;
        } else {
            return false;
        };

        10 == 10;
        10 != 9;
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
            newToken(TOKEN_TYPES.BANG, "!"),
            newToken(TOKEN_TYPES.MINUS, "-"),
            newToken(TOKEN_TYPES.SLASH, "/"),
            newToken(TOKEN_TYPES.ASTERISK, "*"),
            newToken(TOKEN_TYPES.INT, "5"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.INT, "5"),
            newToken(TOKEN_TYPES.LT, "<"),
            newToken(TOKEN_TYPES.INT, "10"),
            newToken(TOKEN_TYPES.GT, ">"),
            newToken(TOKEN_TYPES.INT, "5"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.IF, "if"),
            newToken(TOKEN_TYPES.LPAREN, "("),
            newToken(TOKEN_TYPES.INT, "5"),
            newToken(TOKEN_TYPES.LT, "<"),
            newToken(TOKEN_TYPES.INT, "10"),
            newToken(TOKEN_TYPES.RPAREN, ")"),
            newToken(TOKEN_TYPES.LBRACE, "{"),
            newToken(TOKEN_TYPES.RETURN, "return"),
            newToken(TOKEN_TYPES.TRUE, "true"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.RBRACE, "}"),
            newToken(TOKEN_TYPES.ELSE, "else"),
            newToken(TOKEN_TYPES.LBRACE, "{"),
            newToken(TOKEN_TYPES.RETURN, "return"),
            newToken(TOKEN_TYPES.FALSE, "false"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.RBRACE, "}"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.INT, "10"),
            newToken(TOKEN_TYPES.EQUALS, "=="),
            newToken(TOKEN_TYPES.INT, "10"),
            newToken(TOKEN_TYPES.SEMICOLON, ";"),
            newToken(TOKEN_TYPES.INT, "10"),
            newToken(TOKEN_TYPES.NOT_EQUALS, "!="),
            newToken(TOKEN_TYPES.INT, "9"),
        ];

        const lexer: Lexer = newLexer(input);

        for (let expected of expectedTokens) {
            let currentToken: Token = nextTokenFromLexer(lexer);
            expect(currentToken.type).toEqual(expected.type);
            expect(currentToken.literal).toEqual(expected.literal);
        }
    });
});

