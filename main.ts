import { TOKEN_TYPES, type Token } from "./token/token";

const someToken: Token = { "type": TOKEN_TYPES.ILLEGAL, "literal": "blah" };
console.log(someToken);

