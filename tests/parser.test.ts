import { describe, expect, it } from "vitest"
import { newLexer, type Lexer } from "../lexer/lexer.ts";
import { createParser, parseProgram, type Parser } from "../parser/parser.ts";
import { type Programm, type Statement, isLetStatement } from "../ast/ast.ts";

type TestCase = {
    expectedIdentifier: string
};

describe('Parser', () => {
    it('Test LetStatement', () => {
        const input: string = `
        let x = 5;
        let y = 10;
        let foobar = 898989;`;

        const lexer: Lexer = newLexer(input);
        const parser: Parser = createParser(lexer);
        const programm: Programm | null = parseProgram(parser);
        checkParserErrors(parser);

        expect(programm).toBeTruthy();
        expect(programm.statements.length).toBe(3);

        const testCases: TestCase[] = [
            { expectedIdentifier: "x" },
            { expectedIdentifier: "y" },
            { expectedIdentifier: "foobar" }
        ];

        for (let i: number = 0; i < testCases.length; i++) {
            const statement: Statement = programm.statements[i];
            testLetStatement(statement, testCases[i].expectedIdentifier);
        }
    });
});

function testLetStatement(statement: Statement, expectedIdentifier: string): void {
    expect(statement.tokenLiteral()).toBe("let");

    if (isLetStatement(statement)) {
        expect(statement.name?.value).toBe(expectedIdentifier);
        expect(statement.name?.tokenLiteral()).toBe(expectedIdentifier);
        return;
    }

    throw new Error("Statement is not of type LetStatement");
}

function checkParserErrors(p: Parser): void {
    if (p.errors.length === 0) {
        return;
    }

    for (let errorString of p.errors) {
        console.error(errorString);
    }

    throw new Error("Test fail because of parsing errors");
}

