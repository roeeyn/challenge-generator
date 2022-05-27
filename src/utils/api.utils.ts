import { Challenge, ChallengeApiResponse, ICliOptions } from "../models";

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
      const value = cliOptions[key as keyof ICliOptions];
      const encodedValue = encodeURIComponent(value as string | number);
      return `${key}=${encodedValue}`;
    })
    .join("&");

  return urlParams;
};
