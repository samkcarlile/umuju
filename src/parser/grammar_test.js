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

// const input = fs
//   .readFileSync(path.join(__dirname, '../../data/user_input.umu'), 'utf-8')
//   .split('\n')[0];

lexer.reset(user_input);

Array.from(lexer).map(({ type, value }) => [type, value]); // ?

try {
  parser.feed(user_input);
} catch (err) {
  console.error(err);
}

parser.results[0]; // ? JSON.stringify($, null, ' ')
