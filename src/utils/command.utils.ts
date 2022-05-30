import command from "commander";
import { ICliOptions } from "../models";
import { version } from "../version";

/**
 * Parses the commoand line arguments and returns the options
 *
 * @returns {ICliOptions} The received options from the command line
 */
export const getCliOptions = (): ICliOptions => {
  const program = command.program;

  program
    .version(version)
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
    .option("-v, --verbose", "Show additional information")
    .parse(process.argv);

  return program.opts();
};
