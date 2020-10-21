const moo = require('moo');
const emojiRegex = require('emoji-regex/RGI_Emoji.js')().source;

const lexer = moo.states({
  main: {
    ws: /[ \t]+/,
    nl: { match: '\n', lineBreaks: true },
    comma: ',',
    and: '&&',
    or: '||',
    assignment: '=',
    gt: '🌖',
    lt: '🌔',
    eq: '🌓',
    not: '❗️',
    plus: '+',
    minus: '-',
    divide: '/',
    multiply: '*',
    modulo: '%',
    comment: {
      match: /💬[^\n]*/,
      value: s => s.slice(1),
    },
    block_delimiter: {
      match: /[🌵🎄🌲🌳🌴]+/,
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
    identifier: {
      match: new RegExp(emojiRegex),
      type: moo.keywords({
        import: '👏',
        exit: '👋',
        toString: '🔡',
        toBool: '☯️',
        toNumber: '🔢',
        chain: '⬅️',
        if: '🤔',
        else: '🙃',
        true: '👍',
        false: '👎',
      }),
    },
    template_start: { match: /`/, push: 'template' },
  },
  template: {
    template_end: { match: /`/, pop: 1 },
    const: /[^\n`✨]+/,
    interp: { match: '✨', push: 'interp' },
  },
  // TODO: this is hacky. fix this
  interp: {
    identifier: { match: new RegExp(emojiRegex), pop: 1 },
  },
});

lexer.reset(`
👏 📟
\`Hello ✨🆔 sam!\`
🚌
📟👂 "What's your name?"
`);

const tokens = Array.from(lexer);

tokens; // ?
