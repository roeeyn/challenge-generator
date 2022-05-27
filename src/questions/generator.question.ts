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
