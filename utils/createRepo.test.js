const { parseStarterFn, parseTests } = require("./createRepo.js");

const starterFnDemo = ["1\nfunction addition(a, b) {", "2\n  ", "3\n}"];

describe("Testing repo creation tools", () => {
  test("Parsing starter function", () => {
    const { starterCode, fnNames } = parseStarterFn(starterFnDemo);
    expect(starterCode).toBe(
      "module.exports.addition = (a, b) => {\n// Your amazing code here 🚀!\n}"
    );
    expect(fnNames).toStrictEqual(["addition"]);
  });

  test("Parsing imports statements", () => {
    const parsedTests = parseTests([], ["fn1", "fn2"], 69);
    expect(parsedTests).toBe(
      `const { fn1, fn2 } = require("./challenge70.js");\n\n`
    );
  });
});
