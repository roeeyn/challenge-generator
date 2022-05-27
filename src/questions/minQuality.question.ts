import inquirer from "inquirer";

export const minQualityQuestion = async (): Promise<{ minQuality: Number }> => {
  return inquirer.prompt([
    {
      name: "minQuality",
      type: "number",
      message: "Search for min quality (from 0 to 5)? (e.g. '2.5')",
    },
  ]);
};
