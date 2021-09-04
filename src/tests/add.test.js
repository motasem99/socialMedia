const add = (a, b) => a + b;

const greeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two number', () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

test('should generate greeting from name', () => {
  const result = greeting('Mutasem');
  expect(result).toBe('Hello Mutasem!');
});

test('should generate greeting for no name', () => {
  const result = greeting();
  expect(result).toBe('Hello Anonymous!');
});
