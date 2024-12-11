const addNumbers = (num1: number, num2: number) => {
  return num1 + num2;
};

describe('addNumbers', () => {
  it('adds two numbers', () => {
    expect(addNumbers(2, 1)).toEqual(3);
  });
});
