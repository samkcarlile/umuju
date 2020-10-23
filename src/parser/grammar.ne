@{%
  const lexer = require('./lexer');
%}

@lexer lexer

@{%
  function formatToken(token) {
    return {
      type: token.type,
      value: token.value
    }
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

control_statement
  -> if_statement           {% id %}

if_statement
  -> %_if _ expression _ code_block 

assignment_statement
  -> assignees _ %assignment _ call_expression
     {%
        d => ({
          type: 'assignment',
          asignees: [...d[0]],
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
        d => d[2]
     %}

binary_expression
  -> assignment_expression  {% id %}

assignment_expression
  -> assignment_statement   {% id %}

unary_expression
  # note that an identifier is not a unary expression!
  # All identifiers are considered call expressions
  # if they're not part of an assignment
  -> call_expression        {% id %}
  |  template_expression    {% id %}
  |  string_literal         {% id %}
  |  number_literal         {% id %}

template_expression
  -> %template_start template_body %template_end

template_body
  ->  template_body ( %_const | template_interp )
  |   null
      {%
          () => null
      %}

template_interp
  -> %interp_start expression %interp_end

# possibly a strange note about the call expression...
# When you use an identifier as a variable, you're actually
# "calling" that variable to get it's value
call_expression
  -> identifier
     {%
         d => ({
            type: 'call_expression',
            callee: d[0],
            arguments: [],
         })
     %}
  |  identifier __ argument_list
     {%
         d => ({
            type: 'call_expression',
            callee: d[0],
            arguments: [...d[2]]
         })
     %}
  |  member_expression
     {%
         d => ({
            type: 'call_expression',
            callee: d[0]
         })
     %}

# doing the member expression this way allows for some wierd
# things like this: 🏠🌷 2💧
# But honestly....I think that's kind of ok!
member_expression
  -> identifier call_expression
     {%
         d => ({
            type: 'member_expression',
            object: d[0],
            property: d[1] 
         })
     %}

argument_list
  -> null
     {%
        () => []
     %}
  |  expression
     {%
        d => [d[0]]
     %}
  |  argument_list __ expression
     {%
        d => [...d[0], d[2]]
     %}

line_comment 
  -> %comment               {% d => formatToken(d[0]) %}

number_literal 
  -> %number_literal        {% d => formatToken(d[0]) %}

string_literal 
  -> %string_literal        {% d => formatToken(d[0]) %}

identifier 
  -> %identifier            {% d => formatToken(d[0]) %}

__ -> %ws:+                 {% () => null %}

_ -> %ws:*                  {% () => null %}