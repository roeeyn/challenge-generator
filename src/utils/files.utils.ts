import fs from "fs";
import { FileType, FileExtension, ProgrammingLanguage } from "../models";
import { minify } from "terser";
import { join } from "path";

const BIN_PATH = join(__dirname, "../../lib");

export type FileWriter = (
  content: string,
  fileType: FileType,
  fileExtension: FileExtension
) => void;

/**
 * Create a directory if it doesn't exist, or remove the content if it does.
 *
 * @param {string} path - The path to the directory.
 * @returns {FileWriter} - A function that writes the content to a file in that directory.
 */
export const createOrReplaceDir = (path: string): FileWriter => {
  if (fs.existsSync(path)) fs.rmdirSync(path, { recursive: true });
  fs.mkdirSync(path);

  return (
    content: string,
    fileType: FileType,
    fileExtension: FileExtension
  ) => {
    fs.writeFileSync(join(`${path}`, `${fileType}${fileExtension}`), content);
  };
};

/**
 * Read the template file and minimize if needed.
 *
 * @async
 * @param {FileExtension} fileExtension - The file extension of the template file.
 * @param {Boolean} [minifyContent] - Whether or not to minify the content.
 * @returns {Promise<string>} - The content of the template file.
 */
export const readTemplateTestFile = async (
  fileExtension: FileExtension,
  minifyContent: Boolean = true
): Promise<string> => {
  const templateContent: string = fs.readFileSync(
    join(BIN_PATH, `templates`, `testframework.templates${fileExtension}`),
    "utf8"
  );

  return minifyContent && fileExtension === FileExtension.JAVASCRIPT
    ? ((await minify(templateContent)).code as string)
    : templateContent;
};

/**
 * Read the run template file.
 *
 * @param {FileExtension} fileExtension - The file extension of the template file.
 * @returns {string} The content of the template file.
 */
export const readTemplateRunFile = (fileExtension: FileExtension): string => {
  return fs.readFileSync(
    join(BIN_PATH, `templates`, `run.templates${fileExtension}.bash`),
    "utf8"
  );
};

/**
 * Transfrom a programming language to a file extension.
 *
 * @param {ProgrammingLanguage} progLang - The programming language.
 * @returns {FileExtension} The file extension associated to the lang.
 */
export const progLangToFileExtension = (
  progLang: ProgrammingLanguage
): FileExtension => {
  return progLang === ProgrammingLanguage.JAVASCRIPT
    ? FileExtension.JAVASCRIPT
    : progLang === ProgrammingLanguage.JAVA
    ? FileExtension.JAVA
    : progLang === ProgrammingLanguage.PYTHON
    ? FileExtension.PYTHON
    : FileExtension.UNKNOWN;
};
