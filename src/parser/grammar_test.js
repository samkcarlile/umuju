const nearley = require('nearley');
const grammar = require('./grammar');
const lexer = require('./lexer');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const hello_world = `
👏 📟

📟🗣 "Hello World!"
`;

const user_input = `
👏 📟

🏷 = 📟👂 "What’s your name?"
📟🗣 \`Hello ✨🏷✨!\`
`;

lexer.reset(user_input);

Array.from(lexer).map(({ type, value }) => [type, value]); // ?

try {
  parser.feed(hello_world);
} catch (err) {
  console.error(err);
}

parser.results[0]; // ? JSON.stringify($, null, ' ')
