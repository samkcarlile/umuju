const { LineFeeder, n } = require('../utils');

describe('Parses logical expressions', () => {
  const feeder = new LineFeeder(
    `👍 && 👎
     5 || 👎
     🐶 && 🎲 || 🐱
    `
  );

  it('👍 && 👎', () => {
    expect(feeder.next()).toEqual([
      n.LogicalExpression({
        operator: 'and',
        left: n.True(),
        right: n.False(),
      }),
    ]);
  });

  it('5 || 👎', () => {
    expect(feeder.next()).toEqual([
      n.LogicalExpression({
        operator: 'or',
        left: n.NumberLiteral({ value: 5 }),
        right: n.False(),
      }),
    ]);
  });

  it('🐶 && 🎲 || 🐱', () => {
    expect(feeder.next()).toEqual([
      n.LogicalExpression({
        operator: 'or',
        left: n.LogicalExpression({
          operator: 'and',
          left: n.CallExpression({
            callee: n.Identifier({ value: '🐶' }),
            args: [],
          }),
          right: n.CallExpression({
            callee: n.Identifier({ value: '🎲' }),
            args: [],
          }),
        }),
        right: n.CallExpression({
          callee: n.Identifier({ value: '🐱' }),
          args: [],
        }),
      }),
    ]);
  });
});
