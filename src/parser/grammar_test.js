const nearley = require('nearley');
const grammar = require('./grammar');
const lexer = require('./lexer');

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const input = `
🤔 🌲🌲 🆔 🌖 0 && 🆔 🌘 200 🌲🌲 🌳
  📟🗣 "ID must be between 1 and 200 (inclusive)"
  👋
🌳
`;

const precedence_test = `🆔 🌖 0 && 🆔 🌘 200`;

lexer.reset(precedence_test);

Array.from(lexer).map(({ type, value }) => [type, value]); // ?

try {
  parser.feed(precedence_test);
} catch (err) {
  console.error(err);
}

parser.results[0]; // ? JSON.stringify($, null, ' ')
