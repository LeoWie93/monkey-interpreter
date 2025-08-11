import { TOKEN_TYPES, type Token, newToken } from "./token/token.ts";

const someToken: Token = newToken(TOKEN_TYPES.ILLEGAL, "blah");
console.log(someToken);

