const fs = require('fs');
const path = require('path');
const Parser = require('../parser');

// Helper to read a file from the data directory
const getData = datafile =>
  fs.readFileSync(path.resolve(`data/${datafile}`), 'utf-8');

/** Helper class to feed a parser some input line-by-line */
class LineFeeder {
  constructor(input) {
    this.parser = Parser();
    this.lines = input.split('\n');
    this.currentLine = 0;
    this.currentResultsOffset = 0;
  }

  /** Parse the next n lines of the file
   *  @returns {false|array|Error} - the parse results of the lines or false if EOF */
  next(n = 1) {
    const end = this.currentLine + n;
    if (end > this.lines.length) return false;

    const chunk = this.lines.slice(this.currentLine, end).join('\n');

    const resultsOffset = this.currentResultsOffset;
    try {
      this.parser.feed(chunk);
      this.currentResultsOffset = this.parser.results[0].length;
    } catch (err) {
      return err;
    }

    this.currentLine = end;
    return this.results().slice(resultsOffset);
  }

  results() {
    return this.parser.results[0];
  }
}

/************ Node Type Helpers *************/
const nodeTypeHelpers = {
  Identifier: ({ value }) => ({ type: 'identifier', value }),
  StringLiteral: ({ value }) => ({ type: 'string_literal', value }),
  NumberLiteral: ({ value }) => ({ type: 'number_literal', value }),
  Import: ({ reference }) => ({ type: 'import', reference }),
  CallExpression: ({ callee, args }) => ({
    type: 'call_expression',
    callee,
    args,
  }),
  MemberExpression: ({ object, property }) => ({
    type: 'member_expression',
    object,
    property,
  }),
};

module.exports = {
  n: nodeTypeHelpers,
  getData,
  LineFeeder,
};
