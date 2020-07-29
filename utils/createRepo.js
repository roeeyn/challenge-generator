const fs = require("fs");
const TurndownService = require("turndown");

const html2md = (html, challengeNumber) => {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(html);
  return `# Challenge ${challengeNumber + 1}\n${markdown}`;
};

module.exports.parseStarterFn = starterFn => {
  const expression = / .*\(.*\)/;
  const functions = starterFn.join("").match(expression);
  const fnSignature = functions.map(fn => fn.split("("));
  const starterCode = fnSignature
    .map(
      ([fnName, fnParams]) =>
        `module.exports.${fnName.trim()} = (${fnParams} => {\n// Your amazing code here 🚀!\n}`
    )
    .join("\n");
  const fnNames = fnSignature.map(([fnName]) => fnName.trim());
  return { starterCode, fnNames };
};

module.exports.parseTests = (tests, fnNames, challengeNumber) => {
  const importStatements = `const { ${fnNames.join(
    ", "
  )} } = require("./challenge${challengeNumber + 1}.js");`;
  const parsedTests = tests.join("\n");
  return `${importStatements}\n\n${parsedTests}`;
};

module.exports.createRepo = (exercise, challengeNumber, rootFolder) => {
  console.log(`Challenge #${challengeNumber + 1}`);
  console.log(`Creating folder for ${exercise.title}`);
  const folderName = `Challenge${challengeNumber + 1}`;
  const localPath = `${rootFolder}/${folderName}`;
  fs.mkdirSync(localPath, { recursive: true });

  fs.writeFileSync(
    `${localPath}/README.md`,
    html2md(exercise.description, challengeNumber)
  );

  const { starterCode, fnNames } = module.exports.parseStarterFn(
    exercise.starterFn
  );

  fs.writeFileSync(
    `${localPath}/challenge${challengeNumber + 1}.js`,
    starterCode
  );

  fs.writeFileSync(
    `${localPath}/challenge${challengeNumber + 1}.test.js`,
    module.exports.parseTests(exercise.tests, fnNames, challengeNumber)
  );
};

module.exports.createChallengesFolder = generation => {
  const folderName = `PrepadawansGen${generation}_Challenges`;
  if (fs.existsSync(folderName)) fs.rmdirSync(folderName, { recursive: true });
  fs.mkdirSync(folderName);
  return folderName;
};
