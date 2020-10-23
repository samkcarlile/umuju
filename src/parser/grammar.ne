@{%
  const lexer = require('./lexer');
%}

@lexer lexer

input -> statements   {% id %}

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
  |  _ %nl statements
     {%
        d => d[2]
     %}
  |  _
     {%
        d => []
     %}

statement
  -> line_comment           {% id %}
  |  import_statement       {% id %}
  |  control_statement      {% id %}
  |  expression_statement   {% id %}
  |  assignment_statement   {% id %}

import_statement
  -> %import _ identifier

control_statement
  -> if_statement           {% id %}

if_statement
  -> %if _ expression _ code_block 


expression_statement
  -> expression             {% id %}

assignment_statement
  -> assignees _ %assignment _ call_expression

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
  -> identifier _ %assignment _ expression

unary_expression
  -> member_expression      {% id %}
  # note that an identifier is not a unary expression!
  # All identifiers are considered call expressions
  |  call_expression        {% id %}
  # TODO:
  # |  template_expression    {% id %}
  |  string_literal         {% id %}
  |  number_literal         {% id %}

# doing the member expression this way allows for some wierd
# things like this: 🏠🌷 2💧
# But honestly....I think that's kind of ok!
member_expression
  -> member_expression call_expression

# possibly a strange note about the call expression...
# When you use an identifier as a variable, you're actually
# "calling" that variable to get it's value
call_expression
  -> identifier
  |  identifier __ argument_list

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

line_comment -> %comment

number_literal -> %number_literal

string_literal -> %string_literal

identifier -> %identifier

__ -> %ws:+

_ -> %ws:*