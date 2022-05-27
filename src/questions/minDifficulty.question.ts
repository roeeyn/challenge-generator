import inquirer from "inquirer";

export const minDifficultyQuestion = async (): Promise<{
  minDifficulty: Number;
}> => {
  return inquirer.prompt([
    {
      name: "minDifficulty",
      type: "number",
      message: "Search for min difficulty (from 0 to 5)? (e.g. '2.5')",
    },
  ]);
};
