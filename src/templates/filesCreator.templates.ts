import { Challenge } from "../models";
import {
  createOrReplaceDir,
  showSuccess,
  showCreated,
  showDebug,
  showInfo,
  FileWriter,
  progLangToFileExtension,
  readTemplateTestFile,
  readTemplateRunFile,
} from "../utils";
import { FileType, FileExtension } from "../models";

/**
 * Create the files structure for the challenge
 *
 * @param {Challenge} challenge - The Challenge from the API
 */
export const createFilesFromChallenge = async (
  challenge: Challenge
): Promise<void> => {
  showSuccess("Fetched challenge successfully");
  showDebug(JSON.stringify(challenge, null, 2));
  showInfo("Creating files...");

  // Create the challenge directory
  const dirName =
    "challenge-" + challenge.title.replace(/\s/g, "-").toLowerCase();
  const fileWriter: FileWriter = createOrReplaceDir(dirName);
  showCreated(`Folder ${dirName}`);

  // Create the README.md file
  const readmeContent = `# ${challenge.title}\n\n${challenge.rawInstructions}`;
  fileWriter(readmeContent, FileType.README, FileExtension.MARKDOWN);
  showCreated(`File README.md`);

  // Create the index file
  const fileExtension: FileExtension = progLangToFileExtension(
    challenge.programmingLanguage
  );
  fileWriter(challenge.rawCode as string, FileType.CODE, fileExtension);
  showCreated(`File index${fileExtension}`);

  // Create the test file
  fileWriter(challenge.rawTests as string, FileType.TEST, fileExtension);
  showCreated(`File test${fileExtension}`);

  // Add the testing framework
  const testFrameworkTemplate = await readTemplateTestFile(fileExtension, true);
  fileWriter(testFrameworkTemplate, FileType.TEST_FRAMEWORK, fileExtension);
  showCreated(`File testframework${fileExtension}`);

  // Add the run file
  const runTemplate: string = readTemplateRunFile(fileExtension);
  fileWriter(runTemplate, FileType.RUN, FileExtension.NO_EXTENSION);
  showCreated(`File run`);
};
