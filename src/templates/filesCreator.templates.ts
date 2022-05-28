import { Challenge } from "../models";
import {
  createOrReplaceDir,
  showSuccess,
  showCreated,
  showDebug,
  showInfo,
  FileWriter,
  progLangToFileExtension,
} from "../utils";
import { FileType, FileExtension } from "../models";

/**
 * Create the files structure for the challenge
 *
 * @param {Challenge} challenge - The Challenge from the API
 */
export const createFilesFromChallenge = (challenge: Challenge): void => {
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
  showCreated(`File index.${fileExtension}`);

  // Create the test file
  fileWriter(challenge.rawTests as string, FileType.TEST, fileExtension);
  showCreated(`File test.${fileExtension}`);

  // TODO: Test the run files with Judge 0
};
