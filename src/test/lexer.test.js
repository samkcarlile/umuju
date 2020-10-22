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

test('it properly lexes hello_world.umu', () => {
  const contents = getData('hello_world.umu');
  const tokens = withoutWhitespace(tokenize(contents));

  expect(tokens).toHaveLength(5);
  expectTypes(tokens, [
    'import',
    'identifier',
    'identifier',
    'identifier',
    'string_literal',
  ]);
});

test('it properly lexes user_input.umu', () => {
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
