import inquirer from "inquirer";

import { ICliOptions } from "../utils";
import { Choice } from "../models";

export enum QuestionType {
  INPUT = "input",
  NUMBER = "number",
  LIST = "list",
  CONFIRM = "confirm",
}

export interface IGenerateQuestion {
  name: string;
  type: QuestionType;
  message: string;
  default?: Boolean | String;
  choices?: Choice[];
}

/**
 * Ask for user input for a specific attribute
 *
 * @async
 * @param {String | Number | undefined} cliParam - The value of the CLI if existant
 * @param {Boolean} skipConfirmation - If the user should be asked for confirmation
 * @param {IGenerateQuestion} questionParams - The question parameters
 * @returns {Promise<ICliOptions>} The answer of the user
 */
export const generateQuestion = async (
  cliParam: String | Number | undefined,
  skipConfirmation: Boolean,
  questionParams: IGenerateQuestion
): Promise<ICliOptions> => {
  return skipConfirmation
    ? { [questionParams.name]: cliParam }
    : cliParam === undefined
    ? inquirer.prompt([questionParams])
    : { [questionParams.name]: cliParam };
};
