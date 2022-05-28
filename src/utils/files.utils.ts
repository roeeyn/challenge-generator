import fs from "fs";
import { FileType, FileExtension, ProgrammingLanguage } from "../models";

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
    fs.writeFileSync(`${path}/${fileType}.${fileExtension}`, content);
  };
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
