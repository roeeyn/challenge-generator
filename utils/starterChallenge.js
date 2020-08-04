const readmeFile = `# Challenge 0 - Hello World
This example project is written in Node, and tested with Jest.

The tests are failing right now because we're not returning the correct string. 
Fixing this up will make the tests green.

You have to modify the \`challenge0.js\` file, to make the test pass.

You can see what the test is expecting at \`challenge0.test.js\`

Go, change the file, and run the tests!

To run the tests you can do

\`\`\`
npm run test
\`\`\`
`;

const testFile = `const { hello } = require('./challenge0.js');

test('outputs the correct string', () => {
  expect(hello()).toBe("Hello world!");
});`;

const starterCodeFile = `module.exports.hello = () => {
  return "Hello prepadawan!";
}

`;

module.exports.starterChallenge = {
  challengeNumber: 0,
  challengeIndex: -1,
  starterCodeFile,
  testFile,
  readmeFile,
};
