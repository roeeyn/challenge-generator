import { ICliOptions, Challenge, ChallengeApiResponse } from "../models";
import fetch from "node-fetch";
import { responseToChallenge, cliOptionsToUrlParams } from "../utils";

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
  // FIXME: fix the options params for camelcase to hyphen
  const urlParams: string = cliOptionsToUrlParams(cliOptions);
  const url: string = `${BACKEND_HOST}/api/challenges?${urlParams}`;
  const response = await fetch(url);

  const apiResponse: ChallengeApiResponse = (await response.json())
    .data as ChallengeApiResponse;

  return responseToChallenge(apiResponse);
};