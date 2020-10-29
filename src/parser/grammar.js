// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require('./lexer');


  function formatToken(token) {
    return {
      type: token.type.startsWith('_') ? token.type.slice(1) : token.type,
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
    {"name": "statement", "symbols": ["exit_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["control_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["assignment_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["expression_statement"], "postprocess": id},
    {"name": "import_statement", "symbols": [(lexer.has("import_clap") ? {type: "import_clap"} : import_clap), "_", "identifier"], "postprocess": 
        d => ({
           type: 'import',
           reference: d[2]
        })
             },
    {"name": "exit_statement", "symbols": [(lexer.has("exit") ? {type: "exit"} : exit)], "postprocess": d => formatToken(d[0])},
    {"name": "control_statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "if_statement", "symbols": [(lexer.has("_if") ? {type: "_if"} : _if), "_", "expression", "_", "code_block"], "postprocess": 
        d => ({
          type: 'if_statement',
          test: d[2],
          consequent: d[4]
        })
             },
    {"name": "assignment_statement", "symbols": ["assignees", "_", (lexer.has("assignment") ? {type: "assignment"} : assignment), "_", "initializers"], "postprocess": 
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
    {"name": "initializers", "symbols": ["expression"], "postprocess": 
        d => [d[0]]
             },
    {"name": "initializers", "symbols": ["initializers", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "expression"], "postprocess": 
        d => [...d[0], d[4]]
             },
    {"name": "expression", "symbols": ["binary_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "expression", "symbols": ["code_block"], "postprocess": id},
    {"name": "code_block", "symbols": [(lexer.has("block_delimiter") ? {type: "block_delimiter"} : block_delimiter), "_", "statements", "_", (lexer.has("block_delimiter") ? {type: "block_delimiter"} : block_delimiter)], "postprocess": 
        d => ({
          type: 'code_block',
          statements: d[2]
        })
             },
    {"name": "binary_expression", "symbols": ["assignment_expression"], "postprocess": id},
    {"name": "binary_expression", "symbols": ["logical_expression"], "postprocess": id},
    {"name": "binary_expression", "symbols": ["binary_operation"], "postprocess": id},
    {"name": "assignment_expression", "symbols": ["assignment_statement"], "postprocess": id},
    {"name": "logical_expression$subexpression$1", "symbols": [(lexer.has("and") ? {type: "and"} : and)]},
    {"name": "logical_expression$subexpression$1", "symbols": [(lexer.has("or") ? {type: "or"} : or)]},
    {"name": "logical_expression", "symbols": ["expression", "_", "logical_expression$subexpression$1", "_", "expression"], "postprocess": 
        d => ({
          type: 'logical_expression',
          operator: d[2][0].type,
          left: d[0],
          right: d[4]
        })
             },
    {"name": "unary_expression", "symbols": ["call_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["template_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["string_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["number_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["boolean_literal"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["unary_operation"], "postprocess": id},
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
    {"name": "call_expression", "symbols": ["member_expression"], "postprocess": 
        d => ({
           type: 'call_expression',
           callee: d[0],
           args: [],
        })
             },
    {"name": "call_expression", "symbols": ["identifier"], "postprocess": 
        d => ({
           type: 'call_expression',
           callee: d[0],
           args: [],
        })
             },
    {"name": "call_expression$subexpression$1", "symbols": ["identifier"]},
    {"name": "call_expression$subexpression$1", "symbols": ["member_expression"]},
    {"name": "call_expression", "symbols": ["call_expression$subexpression$1", "__", "argument_list"], "postprocess": 
        d => ({
           type: 'call_expression',
           callee: d[0][0],
           args: [...d[2]]
        })
             },
    {"name": "member_expression", "symbols": ["call_expression", "identifier"], "postprocess": 
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
    {"name": "binary_operation", "symbols": ["expression", "_", "binary_operator", "_", "expression"], "postprocess": 
        d => ({
          type: 'binary_operation',
          operator: d[2].type,
          left: d[0],
          right: d[4]
        })
             },
    {"name": "binary_operator", "symbols": [(lexer.has("eq") ? {type: "eq"} : eq)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("gt") ? {type: "gt"} : gt)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("lt") ? {type: "lt"} : lt)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("plus") ? {type: "plus"} : plus)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("minus") ? {type: "minus"} : minus)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("divide") ? {type: "divide"} : divide)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("multiply") ? {type: "multiply"} : multiply)], "postprocess": id},
    {"name": "binary_operator", "symbols": [(lexer.has("modulo") ? {type: "modulo"} : modulo)], "postprocess": id},
    {"name": "unary_operation", "symbols": ["unary_operator", "expression"]},
    {"name": "unary_operator", "symbols": [(lexer.has("not") ? {type: "not"} : not)], "postprocess": id},
    {"name": "line_comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": d => formatToken(d[0])},
    {"name": "number_literal", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess": d => formatToken(d[0])},
    {"name": "string_literal", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess": d => formatToken(d[0])},
    {"name": "boolean_literal$subexpression$1", "symbols": [(lexer.has("_true") ? {type: "_true"} : _true)]},
    {"name": "boolean_literal$subexpression$1", "symbols": [(lexer.has("_false") ? {type: "_false"} : _false)]},
    {"name": "boolean_literal", "symbols": ["boolean_literal$subexpression$1"], "postprocess": d => formatToken(d[0][0])},
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
