import inquirer from "inquirer";

export const authorIdQuestion = async (): Promise<{
  authorId: String;
}> => {
  return inquirer.prompt([
    {
      name: "authorId",
      type: "input",
      message: "Search for author edabit id? (e.g. 'BkPgkDQGHm66X4Qai')",
    },
  ]);
};
