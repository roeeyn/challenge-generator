import inquirer from "inquirer";
import { Choice, ProgrammingLanguage } from "../models";

export const programmingLanguageQuestion = async (): Promise<{
  programmingLanguage: String;
}> => {
  const choices: Choice[] = [
    {
      name: "JavaScript",
      value: ProgrammingLanguage.JAVASCRIPT,
    },
    {
      name: "Java",
      value: ProgrammingLanguage.JAVA,
    },
    {
      name: "Python",
      value: ProgrammingLanguage.PYTHON,
    },
  ];

  return inquirer.prompt([
    {
      name: "programmingLanguage",
      type: "list",
      message: "Filter by programming language?",
      choices,
    },
  ]);
};
