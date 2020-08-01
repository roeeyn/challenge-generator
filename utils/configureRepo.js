const { generalReadmeTemplate } = require("./generalReadmeTemplate.js");
const { gitIgnoreTemplate } = require("./gitIgnoreTemplate.js");
const { packageJsonTemplate } = require("./packageJsonTemplate.js");

const fs = require("fs");
const simpleGit = require("simple-git");

const createGeneralReadme = (rootFolder, generationNumber) =>
  fs.writeFileSync(
    `${rootFolder}/README.md`,
    generalReadmeTemplate(generationNumber)
  );

const createPackageJson = (rootFolder, generationNumber) =>
  fs.writeFileSync(
    `${rootFolder}/package.json`,
    packageJsonTemplate(generationNumber)
  );

const createGitIgnoreFile = rootFolder =>
  fs.writeFileSync(`${rootFolder}/.gitignore`, gitIgnoreTemplate);

const generateRepo = async () => {
  // TODO try to generate a repo if credentials exist
  return "git@github.com:roeeyn/repomamalon.git";
};
const configureGit = async rootFolder => {
  const git = simpleGit({ baseDir: rootFolder });

  try {
    await git.init();
    const createdRepoUrl = await generateRepo();
    if (createdRepoUrl) await git.addRemote("origin", createdRepoUrl);
  } catch (error) {
    console.log(
      "An error occurred while configuring git in the challenges folder"
    );
  }
};

module.exports.configRepo = async (rootFolder, generationNumber) => {
  createGeneralReadme(rootFolder, generationNumber);
  createGitIgnoreFile(rootFolder);
  createPackageJson(rootFolder, generationNumber);
  configureGit(rootFolder);
};
