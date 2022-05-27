import inquirer from "inquirer";

export const challengeTitleQuestion = async (): Promise<{ title: String }> => {
  return inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Search for title regex? (e.g. 'ort$')",
    },
  ]);
};
