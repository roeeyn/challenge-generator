import inquirer from "inquirer";

export const authorQuestion = async (): Promise<{ author: String }> => {
  return inquirer.prompt([
    {
      name: "author",
      type: "input",
      message: "Search for author regex? (e.g. '^M')",
    },
  ]);
};
