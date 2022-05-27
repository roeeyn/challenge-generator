import command from "commander";

export interface ICliOptions {
  title?: String;
  edabitId?: String;
  author?: String;
  authorId?: String;
  tags?: String | String[];
  minDifficulty?: String | Number;
  minQuality?: String | Number;
  programmingLanguage?: String;
  skipConfirmation?: Boolean;
}

export const getCliOptions = (): ICliOptions => {
  const program = command.program;

  program
    .version("0.0.1")
    .description("A CLI for generating coding challenges")
    .option("--title <title>", "Filter by title?")
    .option("--edabit-id <edabitID>", "Filter by edabit ID?")
    .option("-a, --author <author>", "Filter by author regex?")
    .option("--author-id <authorID>", "Filter by author ID?")
    .option("-t, --tags <tags>", "Filter by tags?")
    .option(
      "-d, --min-difficulty <difficulty>",
      "Filter by minimum difficulty?"
    )
    .option("-q, --min-quality <quality>", "Filter by minimum quality?")
    .option(
      "-p, --programming-language <lang>",
      "Filter by programming language?"
    )
    .option("-s, --skip-confirmation", "Skip confirmation?")
    .parse(process.argv);

  return program.opts();
};
