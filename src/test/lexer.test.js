const lexer = require('../parser/lexer');
const fs = require('fs');
const path = require('path');

// Helper to read a file from the data directory
const getData = datafile =>
  fs.readFileSync(path.resolve(`data/${datafile}`), 'utf-8');

// Helper to return an array of tokens from some input
const tokenize = input => Array.from(lexer.reset(input));

// Helper to remove whitespace tokens
const withoutWhitespace = (tokens, keepLineBreaks = false) =>
  tokens.filter(
    ({ type }) => type !== 'ws' && (keepLineBreaks ? true : type !== 'nl')
  );

// Helper to test token types
const expectTypes = (tokens, expectedTypes) =>
  expect(tokens.map(({ type }) => type)).toEqual(expectedTypes);

////////////////////////////////////////////////////

test('lexes hello_world.umu', () => {
  const contents = getData('hello_world.umu');
  const tokens = withoutWhitespace(tokenize(contents));

  expect(tokens).toHaveLength(5);
  expectTypes(tokens, [
    // 👏 📟
    'import',
    'identifier',

    // 📟🗣 "Hello World!"
    'identifier',
    'identifier',
    'string_literal',
  ]);
});

test('lexes user_input.umu', () => {
  const contents = getData('user_input.umu');
  const tokens = withoutWhitespace(tokenize(contents));

  expect(tokens).toHaveLength(16);
  expectTypes(tokens, [
    // 👏 📟
    'import',
    'identifier',

    // 🏷 = 📟👂 "What’s your name?"
    'identifier',
    'assignment',
    'identifier',
    'identifier',
    'string_literal',

    // 📟🗣 `Hello ✨🏷✨!`
    'identifier',
    'identifier',
    'template_start',
    'const',
    'interp_start',
    'identifier',
    'interp_end',
    'const',
    'template_end',
  ]);
});

test('if statement', () => {
  const input = `🤔 👍 🌴 👋 🌴`;
  const tokens = withoutWhitespace(tokenize(input));

  expect(tokens).toHaveLength(5);

  expectTypes(tokens, [
    'if',
    'true',
    'block_delimiter',
    'exit',
    'block_delimiter',
  ]);
});

test('function chaining', () => {
  const input = `📟🗣 ⬅️ 📟👂 "What is your name?"`;
  const tokens = withoutWhitespace(tokenize(input));

  expect(tokens).toHaveLength(6);

  expectTypes(tokens, [
    'identifier',
    'identifier',
    'chain',
    'identifier',
    'identifier',
    'string_literal',
  ]);
});

test('type conversion', () => {
  const input = `
  🐶 = 🔡 123456
  🐱 = 🔢 "99.1"
  🐐 = ☯️ 1
  `;
  const tokens = withoutWhitespace(tokenize(input));

  expect(tokens).toHaveLength(12);

  expectTypes(tokens, [
    'identifier',
    'assignment',
    'toString',
    'number_literal',

    'identifier',
    'assignment',
    'toNumber',
    'string_literal',

    'identifier',
    'assignment',
    'toBoolean',
    'number_literal',
  ]);
});

test('math', () => {
  const input = `
  🦁 = 🐶 + 🐱
  😀 = 2 * 50.0 - 🐶 / 600
  😞 = 24 % 5 +-45
  `;
  const tokens = withoutWhitespace(tokenize(input));

  expect(tokens).toHaveLength(22);

  expectTypes(tokens, [
    // 🦁 = 🐶 + 🐱
    'identifier',
    'assignment',
    'identifier',
    'plus',
    'identifier',

    // 😀 = 2 * 50.0 - 🐶 / 600
    'identifier',
    'assignment',
    'number_literal',
    'multiply',
    'number_literal',
    'minus',
    'identifier',
    'divide',
    'number_literal',

    // 😞 = 24 % 5 +-45
    'identifier',
    'assignment',
    'number_literal',
    'modulo',
    'number_literal',
    'plus',
    'minus',
    'number_literal',
  ]);
});

test('boolean expression', () => {
  const input = `
  🎉 = 34 🌖 1
  🐰 = 🎉 🌓 👍
  🎃 = 🐰 && 6 🌔 10
  `;
  const tokens = withoutWhitespace(tokenize(input));

  expect(tokens).toHaveLength(17);

  expectTypes(tokens, [
    // 🎉 = 34 🌖 1
    'identifier',
    'assignment',
    'number_literal',
    'gt',
    'number_literal',

    // 🐰 = 🎉 🌓 👍
    'identifier',
    'assignment',
    'identifier',
    'eq',
    'true',

    // 🎃 = 🐰 && 6 🌔 10
    'identifier',
    'assignment',
    'identifier',
    'and',
    'number_literal',
    'lt',
    'number_literal',
  ]);
});
