import { ICliOptions } from "../utils";
import { ProgrammingLanguage } from "../models";

type CliOptionKey = keyof ICliOptions;

const validateKeys = (cleanedCliOptions: ICliOptions) => {
  const numericKeys = ["minDifficulty", "maxDifficulty"];
  const programmingLanguageKeys = ["programmingLanguage"];

  for (const key in cleanedCliOptions) {
    const currentValue = cleanedCliOptions[key as CliOptionKey];

    if (
      currentValue === undefined ||
      currentValue === null ||
      currentValue === ""
    ) {
      throw new Error(`${key} is empty`);
    } else if (numericKeys.includes(key)) {
      if (isNaN(currentValue as number) || currentValue < 0) {
        throw new Error(`${key} must be a number greater than 0`);
      }
    } else if (key === "tags") {
      const newArray: String[] = (currentValue as String).split(",");

      const isValid: Boolean = newArray
        .map((tag) => tag.trim())
        .every((tag) => /^[a-zA-Z]+$/.test(tag));

      if (!Array.isArray(newArray) || !isValid) {
        throw new Error(`${key} must be an array of only words`);
      }

      // Setting up the transformed array to the tags
      cleanedCliOptions["tags"] = newArray as String[];
    } else if (programmingLanguageKeys.includes(key)) {
      if (
        Object.values(ProgrammingLanguage).indexOf(
          currentValue as ProgrammingLanguage
        ) === -1
      ) {
        throw new Error(`${key} must be an array`);
      }
    }
  }

  return cleanedCliOptions;
};

export const cleanCliOptions = (cliOptions: ICliOptions): ICliOptions => {
  const keptKeys = Object.keys(cliOptions).filter((key) => {
    return !!cliOptions[key as CliOptionKey];
  });

  for (const key of Object.keys(cliOptions)) {
    if (!keptKeys.includes(key)) {
      delete cliOptions[key as CliOptionKey];
    }
  }

  return validateKeys(cliOptions);
};
