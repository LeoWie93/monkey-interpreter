import { newLexer, nextTokenFromLexer, type Lexer } from "../lexer/lexer.ts";
import { TOKEN_TYPES, type Token } from "../token/token.ts";
import * as readline from "node:readline";
import { stdin, stdout } from "node:process";

function startRepl(): void {
    const rl: readline.Interface = readline.createInterface(stdin, stdout);

    console.info(">> ");
    rl.on('line', function(line: string): void {

        if (line == "exit") {
            rl.close();
            return;
        }

        const lexer: Lexer = newLexer(line);

        let token: Token = nextTokenFromLexer(lexer)
        for (; token.type != TOKEN_TYPES.EOF; token = nextTokenFromLexer(lexer)) {
            console.info(token);
        }

        console.info(">> ");
    });
}

export {
    startRepl
}
