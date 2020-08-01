const fs = require("fs");

module.exports.main = (exercises, generationNumber) => {
  const rootFolder = module.exports.createChallengesFolder(generationNumber);
  exercises.forEach(exercise => {
    module.exports.createRepo(exercise, rootFolder);
  });
  return rootFolder;
};

module.exports.createRepo = (exercise, rootFolder) => {
  const {
    challengeNumber,
    challengeIndex,
    starterCodeFile,
    testFile,
    readmeFile,
  } = exercise;
  console.log(`Challenge #${challengeNumber}`);

  const folderName = `Challenge${challengeNumber}`;
  const localPath = `${rootFolder}/${folderName}`;

  fs.mkdirSync(localPath, { recursive: true });

  fs.writeFileSync(`${localPath}/README.md`, readmeFile);

  fs.writeFileSync(
    `${localPath}/challenge${challengeNumber}.js`,
    starterCodeFile
  );

  fs.writeFileSync(
    `${localPath}/challenge${challengeNumber}.test.js`,
    testFile
  );
};

module.exports.createChallengesFolder = generation => {
  const folderName = `PrepadawansGen${generation}_Challenges`;
  if (fs.existsSync(folderName)) fs.rmdirSync(folderName, { recursive: true });
  fs.mkdirSync(folderName);
  return folderName;
};
