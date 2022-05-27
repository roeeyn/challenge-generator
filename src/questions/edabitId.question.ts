import inquirer from "inquirer";

export const edabitIdQuestion = async (): Promise<{ edabitId: String }> => {
  return inquirer.prompt([
    {
      name: "edabitId",
      type: "input",
      message: "Search for edabitId? (e.g. '6vSZmN66xhMRDX8YT')",
    },
  ]);
};
