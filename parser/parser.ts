import { createProgramm, createLetStatement, type LetStatement, type Programm, type Statement, createIdentifier } from "../ast/ast.ts"
import { nextTokenFromLexer, type Lexer } from "../lexer/lexer.ts"
import { TOKEN_TYPES, type Token, type TokenType } from "../token/token.ts"

type Parser = {
    lexer: Lexer
    currToken: Token
    nextToken: Token
    errors: string[]
}

function createParser(lexer: Lexer): Parser {
    const currToken = nextTokenFromLexer(lexer);
    const nextToken = nextTokenFromLexer(lexer);
    return { lexer, currToken, nextToken, errors: [] };
}

function advanceParser(parser: Parser): void {
    parser.currToken = parser.nextToken;
    parser.nextToken = nextTokenFromLexer(parser.lexer);
}

function parseProgram(parser: Parser): Programm {
    const programm: Programm = createProgramm();

    while (!curTokenIs(parser, TOKEN_TYPES.EOF)) {
        const statement: Statement | null = parseStatement(parser);
        if (statement) {
            programm.statements.push(statement);
        }

        advanceParser(parser);
    }

    return programm;
}

function parseStatement(parser: Parser): Statement | null {
    switch (parser.currToken.type) {
        case TOKEN_TYPES.LET:
            return parseLetStatement(parser);
        default:
            return null;
    }
}

function parseLetStatement(parser: Parser): Statement | null {
    const letStatement: LetStatement = createLetStatement(parser.currToken);

    if (!expectPeek(parser, TOKEN_TYPES.IDENT)) {
        return null;
    }

    letStatement.name = createIdentifier(parser.currToken, parser.currToken.literal);

    if (!expectPeek(parser, TOKEN_TYPES.ASSIGN)) {
        return null;
    }

    //TODO implement statment parsing, we now just skip to the semicolon
    while (!curTokenIs(parser, TOKEN_TYPES.SEMICOLON)) {
        advanceParser(parser);
    }

    return letStatement;
}

function expectPeek(parser: Parser, type: TokenType): boolean {
    if (peekTokenIs(parser, type)) {
        advanceParser(parser);
        return true;
    } else {
        peekError(parser, type);
        return false;
    }
}

function peekError(parser: Parser, type: TokenType): void {
    parser.errors.push("expected next token to be of type " + type + " but got " + parser.nextToken.type);
}

function curTokenIs(parser: Parser, type: TokenType): boolean {
    return parser.currToken.type === type;
}

function peekTokenIs(parser: Parser, type: TokenType): boolean {
    return parser.nextToken.type === type;
}

export {
    type Parser,
    createParser,
    advanceParser,
    parseProgram
};

