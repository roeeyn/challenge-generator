const { generalReadmeTemplate } = require("./generalReadmeTemplate.js");
const { gitIgnoreTemplate } = require("./gitIgnoreTemplate.js");
const { packageJsonTemplate } = require("./packageJsonTemplate.js");
const { createGitHubRepo } = require("./createGitHubRepo.js");

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

const generateRepo = async generationNumber => {
  const { error, warning, sshUrl, cloneUrl } = await createGitHubRepo(
    `ChallengesGen${generationNumber}Template`,
    `This are the challenges for the repo for the generation ${generationNumber}`
  );
  if (error) return console.log(`An error occured: ${error}`);
  if (warning) return console.log(`WARNING: ${warning}`);
  console.log("Repo created successfully at GitHub");
  console.log("SSH URL:", sshUrl);
  console.log("Clone URL:", cloneUrl);
  console.log("The SSH URL has been set as origin in the repo");
  return sshUrl;
};
const configureGit = async (rootFolder, createdRepoUrl) => {
  const git = simpleGit({ baseDir: rootFolder });

  try {
    await git.init();
    if (createdRepoUrl) await git.addRemote("origin", createdRepoUrl);
    return createdRepoUrl;
  } catch (error) {
    return console.log(
      "An error occurred while configuring git in the challenges folder"
    );
  }
};

module.exports.configRepo = async (rootFolder, generationNumber) => {
  createGeneralReadme(rootFolder, generationNumber);
  createGitIgnoreFile(rootFolder);
  createPackageJson(rootFolder, generationNumber);
  const generatedRepoUrl = await generateRepo(generationNumber);
  return await configureGit(rootFolder, generatedRepoUrl);
};
