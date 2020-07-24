const fs = require("fs");
const TurndownService = require("turndown");

const html2md = html => {
  const turndownService = new TurndownService();
  return turndownService.turndown(html);
};

const parseTests = tests => {
  return tests.join("\n");
};

module.exports.createRepo = (exercise, challengeNumber, rootFolder) => {
  console.log(`Challenge #${challengeNumber + 1}`);
  console.log(`Creating folder for ${exercise.title}`);
  const folderName = `Challenge${challengeNumber + 1}`;
  const localPath = `${rootFolder}/${folderName}`;
  fs.mkdirSync(localPath, { recursive: true });

  fs.writeFileSync(`${localPath}/README.md`, html2md(exercise.description));
  fs.writeFileSync(
    `${localPath}/challenge${challengeNumber + 1}.test.js`,
    parseTests(exercise.tests)
  );
  console.log(exercise);
};

module.exports.createChallengesFolder = generation => {
  const folderName = `PrepadawansGen${generation}_Challenges`;
  if (fs.existsSync(folderName)) fs.rmdirSync(folderName, { recursive: true });
  fs.mkdirSync(folderName);
  return folderName;
};
