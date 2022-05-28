const hello = require("./index");

function test(title, callback) {
  try {
    callback();
  } catch (error) {
    console.log("Failed " + title + "...");
    throw new Error(error);
  }
}

function expect(result) {
  return {
    toBe(expected) {
      if (result !== expected) {
        throw new Error(`expected ${expected} but result is ${result}`);
      } else {
        console.log("Passed");
      }
    },
  };
}

test("Test", () => {
  const result = hello();
  const expected = "Hello World!";
  expect(result).toBe(expected);
});
