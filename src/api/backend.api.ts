import { ICliOptions, Challenge, ChallengeApiResponse } from "../models";
import fetch from "node-fetch";
import {
  showDebug,
  responseToChallenge,
  cliOptionsToUrlParams,
} from "../utils";

const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:4000";

/**
 * Challenge API client
 *
 * @async
 * @param {ICliOptions} cliOptions - The options passed to the API
 * @returns {Promise<Challenge>} The challenge from the API
 */
export const getChallengeFromApi = async (
  cliOptions: ICliOptions
): Promise<Challenge> => {
  const urlParams: string = cliOptionsToUrlParams(cliOptions);
  const url: string = `${BACKEND_HOST}/api/challenges?${urlParams}`;
  showDebug(`Complete URL: ${url}`);

  const response = await fetch(url);

  const apiResponse: ChallengeApiResponse = (await response.json())
    .data as ChallengeApiResponse;

  if (apiResponse) return responseToChallenge(apiResponse);

  throw new Error("No challenge was found for those filters");
};
