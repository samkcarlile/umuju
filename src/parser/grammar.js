// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require('./lexer');


  function formatToken(token) {
    return {
      type: token.type,
      value: token.value
    }
  }

  function isExpression(node) {
    return token.type && token.type.endsWith("_expression");
  }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["statements"], "postprocess": id},
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        d => [d[0]]
             },
    {"name": "statements", "symbols": ["statements", "_", (lexer.has("nl") ? {type: "nl"} : nl), "_", "statement"], "postprocess": 
        d => [
          ...d[0],
          d[4]
        ]
             },
    {"name": "statements", "symbols": ["statements", "_", (lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": 
        d => d[0]
             },
    {"name": "statements", "symbols": ["_"], "postprocess": 
        d => []
             },
    {"name": "statement", "symbols": ["line_comment"], "postprocess": id},
    {"name": "statement", "symbols": ["import_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["control_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["assignment_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["expression_statement"], "postprocess": id},
    {"name": "import_statement", "symbols": [(lexer.has("import_clap") ? {type: "import_clap"} : import_clap), "_", "identifier"], "postprocess": 
        d => ({
           type: 'import',
           reference: d[2]
        })
             },
    {"name": "control_statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "if_statement", "symbols": [(lexer.has("_if") ? {type: "_if"} : _if), "_", "expression", "_", "code_block"]},
    {"name": "assignment_statement", "symbols": ["assignees", "_", (lexer.has("assignment") ? {type: "assignment"} : assignment), "_", "call_expression"], "postprocess": 
        d => ({
          type: 'assignment',
          assignees: [...d[0]],
          init: d[4]
        })
             },
    {"name": "expression_statement", "symbols": ["expression"], "postprocess": id},
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
    {"name": "assignment_expression", "symbols": ["assignment_statement"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["call_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["template_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["string_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["number_literal"], "postprocess": id},
    {"name": "template_expression$ebnf$1", "symbols": ["template_body"], "postprocess": id},
    {"name": "template_expression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "template_expression", "symbols": [(lexer.has("template_start") ? {type: "template_start"} : template_start), "template_expression$ebnf$1", (lexer.has("template_end") ? {type: "template_end"} : template_end)], "postprocess": 
        d => ({
          type: 'template_expression',
          elements: d[1]
        })
             },
    {"name": "template_body$subexpression$1", "symbols": ["const"]},
    {"name": "template_body$subexpression$1", "symbols": ["template_interp"]},
    {"name": "template_body", "symbols": ["template_body", "template_body$subexpression$1"], "postprocess": 
        d => [...d[0], d[1][0]]
              },
    {"name": "template_body", "symbols": [], "postprocess": 
        () => []
              },
    {"name": "template_interp", "symbols": [(lexer.has("interp_start") ? {type: "interp_start"} : interp_start), "expression", (lexer.has("interp_end") ? {type: "interp_end"} : interp_end)], "postprocess": 
        d => d[1]
             },
    {"name": "call_expression", "symbols": ["identifier"], "postprocess": 
        d => ({
           type: 'call_expression',
           callee: d[0],
           arguments: [],
        })
             },
    {"name": "call_expression", "symbols": ["identifier", "__", "argument_list"], "postprocess": 
        d => ({
           type: 'call_expression',
           callee: d[0],
           arguments: [...d[2]]
        })
             },
    {"name": "call_expression", "symbols": ["member_expression"], "postprocess": 
        d => ({
           type: 'call_expression',
           callee: d[0]
        })
             },
    {"name": "member_expression", "symbols": ["identifier", "call_expression"], "postprocess": 
        d => ({
           type: 'member_expression',
           object: d[0],
           property: d[1] 
        })
             },
    {"name": "argument_list", "symbols": ["expression"], "postprocess": 
        d => [d[0]]
             },
    {"name": "argument_list", "symbols": ["argument_list", "__", "expression"], "postprocess": 
        d => [...d[0], d[2]]
             },
    {"name": "argument_list", "symbols": [], "postprocess": 
        () => []
             },
    {"name": "line_comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": d => formatToken(d[0])},
    {"name": "number_literal", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess": d => formatToken(d[0])},
    {"name": "string_literal", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess": d => formatToken(d[0])},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": d => formatToken(d[0])},
    {"name": "const", "symbols": [(lexer.has("_const") ? {type: "_const"} : _const)], "postprocess": d => formatToken(d[0])},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": () => null},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
