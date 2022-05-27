import inquirer from "inquirer";

export const authorQuestion = async (
  cliParam: String | undefined,
  skipConfirmation: Boolean
): Promise<{ author: String }> => {
  return skipConfirmation
    ? { ["author"]: cliParam }
    : cliParam === undefined
    ? inquirer.prompt([
        {
          name: "author",
          type: "input",
          message: "Search for author regex? (e.g. '^M')",
        },
      ])
    : { ["author"]: cliParam };
};
