import inquirer from "inquirer";

export const tagsQuestion = async (): Promise<{ tags: String }> => {
  return inquirer.prompt([
    {
      name: "tags",
      type: "input",
      message: "Search for tags? (e.g. 'strings, algorithms, sorting')",
    },
  ]);
};
