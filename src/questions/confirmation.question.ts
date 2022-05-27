import inquirer from "inquirer";
import { ICliOptions } from "../utils";

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
