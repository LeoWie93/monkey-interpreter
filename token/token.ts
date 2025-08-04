
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

    //DELIMITERS
    COMMA: ",",
    SEMICOLON: ";",

    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",

    //KEYWORDS
    LET: "LET",
    FUNCTION: "FUNCTION",
} as const;

type TokenType = typeof TOKEN_TYPES[keyof typeof TOKEN_TYPES];

interface Token {
    type: TokenType
    literal: string
};

export {
    TOKEN_TYPES,
    type TokenType,
    type Token
};

