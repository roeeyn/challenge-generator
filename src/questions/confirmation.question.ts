import inquirer from "inquirer";
import { ICliOptions } from "../models";

/**
 * Confirms the user's choice in its params
 *
 * @async
 * @param {ICliOptions} cliOptions - Received CLI options
 * @returns {Promise<{isConfirmed: Boolean}>}
 * - Boolean promise indicating if the user confirmed
 */
export const confirmParamsQuestion = async (
  cliOptions: ICliOptions
): Promise<{
  isConfirmed: Boolean;
}> => {
  return inquirer.prompt([
    {
      name: "isConfirmed",
      type: "confirm",
      default: false,
      message: `Selected params:\n${JSON.stringify(
        cliOptions,
        null,
        2
      )}\nUse this for filtering?`,
    },
  ]);
};
