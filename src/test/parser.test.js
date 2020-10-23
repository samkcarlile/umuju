const { getData, LineFeeder, n } = require('./utils');

test('it parses hello_world.umu', () => {
  const feeder = new LineFeeder(getData('hello_world.umu'));

  expect(feeder.next()).toEqual([
    n.Import({
      reference: n.Identifier({ value: '📟' }),
    }),
  ]);

  expect(feeder.next(2)).toEqual([
    n.CallExpression({
      callee: n.MemberExpression({
        object: n.CallExpression({
          callee: n.Identifier({ value: '📟' }),
          args: [],
        }),
        property: n.Identifier({ value: '🗣' }),
      }),
      args: [n.StringLiteral({ value: 'Hello World!' })],
    }),
  ]);
});

test('it parses user_input.umu', () => {
  const feeder = new LineFeeder(getData('user_input.umu'));

  expect(feeder.next()).toEqual([
    n.Import({
      reference: n.Identifier({ value: '📟' }),
    }),
  ]);

  feeder.next(); // skip the new line

  expect(feeder.next()).toEqual([
    n.Assignment({
      assignees: [n.Identifier({ value: '🏷' })],
      init: [
        n.CallExpression({
          callee: n.MemberExpression({
            object: n.CallExpression({
              callee: n.Identifier({ value: '📟' }),
              args: [],
            }),
            property: n.Identifier({ value: '👂' }),
          }),
          args: [n.StringLiteral({ value: "What's your name?" })],
        }),
      ],
    }),
  ]);

  expect(feeder.next()).toEqual([
    n.CallExpression({
      callee: n.MemberExpression({
        object: n.CallExpression({
          callee: n.Identifier({ value: '📟' }),
          args: [],
        }),
        property: n.Identifier({ value: '🗣' }),
      }),
      args: [
        n.TemplateExpression({
          elements: [
            n.Const({ value: 'Hello ' }),
            n.CallExpression({
              callee: n.Identifier({ value: '🏷' }),
              args: [],
            }),
            n.Const({ value: '!' }),
          ],
        }),
      ],
    }),
  ]);
});
