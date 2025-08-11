import { lookupIdentifier, newToken, TOKEN_TYPES, type Token, type TokenType } from "../token/token.ts";

interface Lexer {
    input: string
    position: number
    readPosition: number
    currChar: string | null
}

function newLexer(input: string): Lexer {
    const lexer = {
        "input": input,
        "position": 0,
        "readPosition": 0,
        "currChar": "",
    } as Lexer;

    readChar(lexer);
    return lexer;
}

function nextTokenFromLexer(lexer: Lexer): Token {
    let token: Token;
    const char: string | null = lexer.currChar;

    switch (char) {
        case "=":
            token = newToken(TOKEN_TYPES.ASSIGN, char);
            break;
        case ",":
            token = newToken(TOKEN_TYPES.COMMA, char);
            break;
        case ";":
            token = newToken(TOKEN_TYPES.SEMICOLON, char);
            break;
        case "+":
            token = newToken(TOKEN_TYPES.PLUS, char);
            break;
        case "(":
            token = newToken(TOKEN_TYPES.LPAREN, char);
            break;
        case ")":
            token = newToken(TOKEN_TYPES.RPAREN, char);
            break;
        case "{":
            token = newToken(TOKEN_TYPES.LBRACE, char);
            break;
        case "}":
            token = newToken(TOKEN_TYPES.RBRACE, char);
            break;
        case null:
            token = newToken(TOKEN_TYPES.EOF, "");
            break;
        default:
            //TODO handle newlines / whitespaces
            if (isLetter(char)) {
                const literal: string = readIdentifier(lexer);
                const tokenType: TokenType = lookupIdentifier(literal);
                return newToken(tokenType, literal);
            } else {
                token = newToken(TOKEN_TYPES.ILLEGAL, char);
            }
    }

    readChar(lexer);
    return token;
}


function readIdentifier(lexer: Lexer): string {
    const position: number = lexer.position;
    while (isLetter(lexer.currChar)) {
        readChar(lexer);
    }

    return lexer.input.slice(position, lexer.position);
}

function isLetter(char: string | null): boolean {
    if (!char) return false;
    return ("a" <= char && char <= "z") || ("A" <= char && char <= "Z") || char == "_";
}

function readChar(lexer: Lexer): void {
    if (lexer.readPosition >= lexer.input.length) {
        lexer.currChar = null;
    } else {
        lexer.currChar = lexer.input.charAt(lexer.readPosition);
    }

    lexer.position = lexer.readPosition;
    lexer.readPosition += 1;
}

export {
    type Lexer,
    newLexer,
    nextTokenFromLexer,
}

