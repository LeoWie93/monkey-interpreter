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

    skipWhitespaces(lexer);
    const char: string | null = lexer.currChar;

    switch (char) {
        // implement forward lookup for !=
        // implement forward lookup for negation / NOT operator
        case "!":
            token = newToken(TOKEN_TYPES.BANG, char);
            break;
        // implement forward lookup for ==
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
        case "-":
            token = newToken(TOKEN_TYPES.MINUS, char);
            break;
        case "/":
            token = newToken(TOKEN_TYPES.SLASH, char);
            break;
        case "<":
            token = newToken(TOKEN_TYPES.LT, char);
            break;
        case ">":
            token = newToken(TOKEN_TYPES.GT, char);
            break;
        case "*":
            token = newToken(TOKEN_TYPES.ASTERISK, char);
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
            if (isLetter(char)) {
                const literal: string = readIdentifier(lexer);
                const tokenType: TokenType = lookupIdentifier(literal);
                return newToken(tokenType, literal);
            } else if (isDigit(char)) {
                return newToken(TOKEN_TYPES.INT, readNumber(lexer));
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

function isDigit(char: string | null): boolean {
    if (!char) return false;

    const digit: number = Number.parseInt(char);
    return 0 <= digit && digit <= 9;
}

function readNumber(lexer: Lexer): string {
    const position: number = lexer.position;
    while (isDigit(lexer.currChar)) {
        readChar(lexer);
    }

    return lexer.input.slice(position, lexer.position);
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

function skipWhitespaces(lexer: Lexer): void {
    while (lexer.currChar == " " || lexer.currChar == "\t" || lexer.currChar == "\r" || lexer.currChar == "\n") {
        readChar(lexer);
    }
}

export {
    type Lexer,
    newLexer,
    nextTokenFromLexer,
}

