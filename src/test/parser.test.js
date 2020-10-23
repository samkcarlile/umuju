const { getData, LineFeeder, n } = require('./utils');

test('it parses hello_world', () => {
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
