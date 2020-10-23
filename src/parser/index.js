const nearley = require('nearley');
const grammar = require('./grammar');
module.exports = () =>
  new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
