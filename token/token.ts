
const TOKEN_TYPES = {
    //SPECIAL
    ILLEGAL: "ILLEGAL",
    EOF: "EOF",

    //Identifiers + literals
    IDENT: "IDENT",
    INT: "INT",

    //OPERATORS
    ASSIGN: "=",
    PLUS: "+",
    MINUS: "-",
    ASTERISK: "*",
    SLASH: "/",
    BANG: "!",
    LT: "<",
    GT: ">",


    EQUALS: "==",
    NOT_EQUALS: "!=",
    //LEQ "<="
    //GEQ ">="

    //DELIMITERS
    COMMA: ",",
    SEMICOLON: ";",

    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",
    // arrays? []

    //KEYWORDS
    FUNCTION: "FUNCTION",
    LET: "LET",
    // const => make this script lang immutable?
    TRUE: "TRUE",
    FALSE: "FALSE",
    IF: "IF",
    ELSE: "ELSE",
    RETURN: "RETURN",
} as const;

type TokenType = typeof TOKEN_TYPES[keyof typeof TOKEN_TYPES];

type Token = {
    type: TokenType
    literal: string | null
};

function newToken(type: TokenType, literal: string | null): Token {
    return {
        type,
        literal,
    } as Token;
}

const IDENTIFIER_MAP = new Map<string, TokenType>([
    ["fn", TOKEN_TYPES.FUNCTION],
    ["let", TOKEN_TYPES.LET],
    ["true", TOKEN_TYPES.TRUE],
    ["false", TOKEN_TYPES.FALSE],
    ["if", TOKEN_TYPES.IF],
    ["else", TOKEN_TYPES.ELSE],
    ["return", TOKEN_TYPES.RETURN],
]);

function lookupIdentifier(literal: string): TokenType {
    const type: TokenType | undefined = IDENTIFIER_MAP.get(literal);
    if (!type) {
        return TOKEN_TYPES.IDENT;
    }

    return type;

}

export {
    TOKEN_TYPES,
    IDENTIFIER_MAP,
    type TokenType,
    type Token,
    newToken,
    lookupIdentifier
};

