@{%
  const lexer = require('./lexer');
%}

@lexer lexer

@{%
  function formatToken(token) {
    return {
      type: token.type.startsWith('_') ? token.type.slice(1) : token.type,
      value: token.value
    }
  }

  function isExpression(node) {
    return token.type && token.type.endsWith("_expression");
  }
%} 

main -> statements   {% id %}

statements
  -> statement
     {%
        d => [d[0]]
     %}
  |  statements _ %nl _ statement
     {%
        d => [
          ...d[0],
          d[4]
        ]
     %}
  |  statements _ %nl
     {%
        d => d[0]
     %}
  |  _
     {%
        d => []
     %}

statement
  -> line_comment           {% id %}
  |  import_statement       {% id %}
  |  exit_statement         {% id %}
  |  control_statement      {% id %}
  |  assignment_statement   {% id %}
  |  expression_statement   {% id %}

import_statement
  -> %import_clap _ identifier
     {%
         d => ({
            type: 'import',
            reference: d[2]
         })
     %}

exit_statement -> %exit     {% d => formatToken(d[0]) %}

control_statement
  -> if_statement           {% id %}

if_statement
  -> %_if _ expression _ code_block
     {%
        d => ({
          type: 'if_statement',
          test: d[2],
          consequent: d[4]
        })
     %}

assignment_statement
  # we want to be able to do multi-assignment like this:
  # 🍌, 🍊 = "hey", 45.9
  # But we also want to be able to do assignments where the init is a
  # call_expression like this: 🍐 = 🏠 "first floor"
  -> assignees _ %assignment _ initializers
     {%
        d => ({
          type: 'assignment',
          assignees: [...d[0]],
          init: d[4]
        })
     %}

expression_statement
  -> expression             {% id %}

assignees
  -> identifier
     {%
        d => [d[0]]
     %}
  |  assignees _ %comma _ identifier
     {%
        d => [...d[0], d[4]]
     %}

initializers
  -> expression
     {%
        d => [d[0]]
     %}
  |  initializers _ %comma _ expression
     {%
        d => [...d[0], d[4]]
     %}

expression
  -> binary_expression      {% id %}
  |  unary_expression       {% id %}
  # I don't know if code blocks can be expressions yet, but for now they are
  |  code_block             {% id %}

# TODO: add support for new lines wtf!
code_block
  # the only problem with reusing the statements rule here is that
  # import statements should not appear in a code block.
  -> %block_delimiter _ statements _ %block_delimiter
     {%
        d => ({
          type: 'code_block',
          statements: d[2]
        })
     %}

binary_expression
  -> assignment_expression  {% id %}
  # TODO: this is not working properly
  |  logical_expression     {% id %}
  |  binary_operation       {% id %}

assignment_expression
  -> assignment_statement   {% id %}

logical_expression
  -> expression _ (%and | %or) _ expression
     {%
        d => ({
          type: 'logical_expression',
          operator: d[2][0].type,
          left: d[0],
          right: d[4]
        })
     %}

unary_expression
  # note that an identifier is not a unary expression!
  # All identifiers are considered call expressions
  # if they're not part of an assignment
  -> call_expression        {% id %}
  |  template_expression    {% id %}
  |  string_literal         {% id %}
  |  number_literal         {% id %}
  |  boolean_literal        {% id %}
  |  unary_operation        {% id %}

template_expression
  -> %template_start template_body:? %template_end
     {%
        d => ({
          type: 'template_expression',
          elements: d[1]
        })
     %}

template_body
  ->  template_body (const | template_interp)
      {%
        d => [...d[0], d[1][0]]
      %}
  |   null
      {%
          () => []
      %}

template_interp
  -> %interp_start expression %interp_end
     {%
        d => d[1]
     %}

# possibly a strange note about the call expression...
# When you use a single identifier as a variable, you're actually
# "calling" that variable to get it's value
call_expression
  -> member_expression
     {%
         d => ({
            type: 'call_expression',
            callee: d[0],
            args: [],
         })
     %}
  |  identifier
     {%
         d => ({
            type: 'call_expression',
            callee: d[0],
            args: [],
         })
     %}
  |  (identifier | member_expression) __ argument_list
     {%
         d => ({
            type: 'call_expression',
            callee: d[0][0],
            args: [...d[2]]
         })
     %}

# doing the member expression this way allows for some wierd
# things like this: 🏠🌷 2💧
# But honestly....I think that's kind of ok!
member_expression
  -> call_expression identifier
     {%
         d => ({
            type: 'member_expression',
            object: d[0],
            property: d[1] 
         })
     %}

argument_list
  -> expression
     {%
        d => [d[0]]
     %}
  |  argument_list __ expression
     {%
        d => [...d[0], d[2]]
     %}
  |  null
     {%
        () => []
     %}

binary_operation
  -> expression _ binary_operator _ expression
     {%
        d => ({
          type: 'binary_operation',
          operator: d[2].type,
          left: d[0],
          right: d[4]
        })
     %}

binary_operator
  -> %eq                    {% id %}
  |  %gt                    {% id %}
  |  %lt                    {% id %}
  |  %plus                  {% id %}
  |  %minus                 {% id %}
  |  %divide                {% id %}
  |  %multiply              {% id %}
  |  %modulo                {% id %}

unary_operation
  -> unary_operator expression

unary_operator
  -> %not                   {% id %}

line_comment 
  -> %comment               {% d => formatToken(d[0]) %}

number_literal 
  -> %number_literal        {% d => formatToken(d[0]) %}

string_literal 
  -> %string_literal        {% d => formatToken(d[0]) %}

boolean_literal
  -> (%_true | %_false)     {% d => formatToken(d[0][0]) %}

identifier 
  -> %identifier            {% d => formatToken(d[0]) %}

const
  -> %_const                {% d => formatToken(d[0]) %}

__ -> %ws:+                 {% () => null %}

_ -> %ws:*                  {% () => null %}