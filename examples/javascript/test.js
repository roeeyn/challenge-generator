const hello = require("./index");
const { test, expect } = require("./testing-framework");

test("Test expected message", () => {
  const result = hello();
  const expected = "Hello World!";
  expect(result).toBe(expected);
  expect(typeof result).toBe("string");
});
