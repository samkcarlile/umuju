const moo = require('moo');
const {
  treeRegex,
  speechBallooonRegex,
  equalMoonRegex,
  greaterThanMoonRegex,
  lessThanMoonRegex,
  otherEmojiRegex,
} = require('./customEmojiRegex');
const emojiRegex = () =>
  new RegExp(
    `${require('emoji-regex/RGI_Emoji.js')().source}|${otherEmojiRegex.source}`
  );

const lexer = moo.states({
  main: {
    ws: /[ \t]+/,
    nl: { match: '\n', lineBreaks: true },
    comma: ',',
    and: '&&',
    or: '||',
    assignment: '=',
    gt: greaterThanMoonRegex,
    lt: lessThanMoonRegex,
    eq: equalMoonRegex,
    not: '❗️',
    plus: '+',
    minus: '-',
    divide: '/',
    multiply: '*',
    modulo: '%',
    comment: {
      match: new RegExp(`${speechBallooonRegex.source}.*$`),
      value: s => s.slice(2), // 2 because the the speech balloon emoji is 2 unicode characters
    },
    block_delimiter: {
      match: new RegExp(`(?:${treeRegex.source})+`),
      lineBreaks: true,
    },
    string_literal: {
      match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
      value: s => JSON.parse(s),
    },
    number_literal: {
      match: /\d+(?:\.\d+)?/,
      value: s => Number(s),
    },
    interp_end: { match: '✨', pop: 1 },
    identifier: {
      match: emojiRegex(),
      type: moo.keywords({
        import_clap: '👏',
        exit: '👋',
        toString: '🔡',
        toBoolean: '☯️',
        toNumber: '🔢',
        chain: '⬅️',
        _while: '🔁',
        _if: '🤔',
        _else: '🙃',
        _true: '👍',
        _false: '👎',
      }),
    },
    template_start: { match: /`/, push: 'template' },
  },
  template: {
    template_end: { match: /`/, pop: 1 },
    _const: /[^\n`✨]+/,
    interp_start: { match: '✨', push: 'main' },
  },
});

module.exports = lexer;
