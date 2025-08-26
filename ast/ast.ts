import { type Token } from "../token/token.ts"

interface Node {
    tokenLiteral(): string | null
}

//these two interfaces are not necessary, but help us and let the lsp warn us if we are working with the wrong type of Node
interface Statement extends Node {
    statementNode(): Node
}

interface Expression extends Node {
    expressionNode(): Node
}

type Programm = {
    statements: Statement[]
    tokenLiteral(): string | null
}

function createProgramm(): Programm {
    return {
        statements: [],
        tokenLiteral() {
            if (this.statements.length > 0) {
                return this.statements[0].tokenLiteral();
            }

            return null;
        },
    };
}

type LetStatement = {
    token: Token // the TOKEN_TYPE.LET token
    name: Identifier | null
    value: Expression | null
    tokenLiteral(): string | null
    statementNode(): Node
}

function createLetStatement(
    token: Token,
    name: Identifier | null = null,
    value: Expression | null = null
): LetStatement {
    return {
        token, name, value,
        tokenLiteral(): string | null { return this.token.literal; },
        //TODO
        statementNode(): Node { return this; },
    };
}

function isLetStatement(s: Statement): s is LetStatement {
    const letStatement: LetStatement = s as LetStatement;
    return letStatement.name !== undefined
        && letStatement.token !== undefined
        && letStatement.value !== undefined;
}

type Identifier = {
    token: Token // the TOKEN_TYPE.IDENT token
    value: string | null
    tokenLiteral(): string | null
    expressionNode(): Node
}

function createIdentifier(
    token: Token,
    value: string | null,
): Identifier {
    return {
        token, value,
        tokenLiteral(): string | null { return this.token.literal },
        //TODO
        expressionNode(): Node { return this; },
    };
}

export {
    type Programm,
    type Statement,
    type Expression,
    type LetStatement,
    type Identifier,
    createProgramm,
    createIdentifier,
    createLetStatement,
    isLetStatement
}

