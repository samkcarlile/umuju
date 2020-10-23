// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require('./lexer');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "input", "symbols": ["statements"], "postprocess": id},
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        d => [d[0]]
             },
    {"name": "statements", "symbols": ["statements", "_", (lexer.has("nl") ? {type: "nl"} : nl), "_", "statement"], "postprocess": 
        d => [
          ...d[0],
          d[4]
        ]
             },
    {"name": "statements", "symbols": ["_", (lexer.has("nl") ? {type: "nl"} : nl), "statements"], "postprocess": 
        d => d[2]
             },
    {"name": "statements", "symbols": ["_"], "postprocess": 
        d => []
             },
    {"name": "statement", "symbols": ["line_comment"], "postprocess": id},
    {"name": "statement", "symbols": ["import_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["control_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["expression_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["assignment_statement"], "postprocess": id},
    {"name": "import_statement", "symbols": [(lexer.has("import") ? {type: "import"} : import), "_", "identifier"]},
    {"name": "control_statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "if_statement", "symbols": [(lexer.has("if") ? {type: "if"} : if), "_", "expression", "_", "code_block"]},
    {"name": "expression_statement", "symbols": ["expression"], "postprocess": id},
    {"name": "assignment_statement", "symbols": ["assignees", "_", (lexer.has("assignment") ? {type: "assignment"} : assignment), "_", "call_expression"]},
    {"name": "assignees", "symbols": ["identifier"], "postprocess": 
        d => [d[0]]
             },
    {"name": "assignees", "symbols": ["assignees", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "identifier"], "postprocess": 
        d => [...d[0], d[4]]
             },
    {"name": "expression", "symbols": ["binary_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["code_block"], "postprocess": id},
    {"name": "code_block", "symbols": [(lexer.has("block_delimiter") ? {type: "block_delimiter"} : block_delimiter), "_", "statements", "_", (lexer.has("block_delimiter") ? {type: "block_delimiter"} : block_delimiter)], "postprocess": 
        d => d[2]
             },
    {"name": "binary_expression", "symbols": ["assignment_expression"], "postprocess": id},
    {"name": "assignment_expression", "symbols": ["identifier", "_", (lexer.has("assignment") ? {type: "assignment"} : assignment), "_", "expression"]},
    {"name": "unary_expression", "symbols": ["member_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["call_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["string_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["number_literal"], "postprocess": id},
    {"name": "member_expression", "symbols": ["member_expression", "call_expression"]},
    {"name": "call_expression", "symbols": ["identifier"]},
    {"name": "call_expression", "symbols": ["identifier", "__", "argument_list"]},
    {"name": "argument_list", "symbols": [], "postprocess": 
        () => []
             },
    {"name": "argument_list", "symbols": ["expression"], "postprocess": 
        d => [d[0]]
             },
    {"name": "argument_list", "symbols": ["argument_list", "__", "expression"], "postprocess": 
        d => [...d[0], d[2]]
             },
    {"name": "line_comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)]},
    {"name": "number_literal", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)]},
    {"name": "string_literal", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)]},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
