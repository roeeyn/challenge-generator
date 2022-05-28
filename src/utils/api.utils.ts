import {
  Challenge,
  ChallengeApiResponse,
  CleanCliOptionsType,
  ICliOptions,
} from "../models";

/**
 * Transform a ChallengeApiResponse to a Challenge
 *
 * @param {ChallengeApiResponse} response - The response from the API
 * @returns {Challenge} - The transformed Challenge
 */
export const responseToChallenge = (
  response: ChallengeApiResponse
): Challenge => {
  return {
    _id: response._id,
    author: response.author,
    authorEdabitId: response.author_edabit_id,
    difficulty: response.difficulty,
    edabitId: response.edabit_id,
    programmingLanguage: response.programming_language,
    quality: response.quality,
    rawCode: response.raw_code,
    rawInstructions: response.raw_instructions,
    rawTests: response.raw_tests,
    summary: response.summary,
    tags: response.tags,
    title: response.title,
  };
};

/**
 * Create URL parameters from a CliOptions object
 *
 * @param {ICliOptions} cliOptions - Options from the CLI
 * @returns {string} - The URL parameters
 */
export const cliOptionsToUrlParams = (cliOptions: ICliOptions): string => {
  const urlParams: string = Object.keys(cliOptions)
    .map((key) => {
      const value: CleanCliOptionsType = cliOptions[
        key as keyof ICliOptions
      ] as CleanCliOptionsType;
      // const encodedValue = encodeURIComponent(value as string | number);
      const computedValue: string | number = (
        Array.isArray(value) ? JSON.stringify(value) : value
      ) as string | number;
      const encodedValue: string = encodeURIComponent(computedValue);
      return `${camelCaseToKebabCase(key)}=${encodedValue}`;
    })
    .join("&");

  return urlParams;
};

/**
 * Transform camel case string to kebab case.
 * e.g. authorId -> author-id
 *
 * @param {string} str - camel case string
 * @returns {string} - kebab case string
 */
export const camelCaseToKebabCase = (str: string): string => {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
};
