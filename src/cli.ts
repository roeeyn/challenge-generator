import {
  confirmParamsQuestion,
  generateQuestion,
  QuestionType,
} from "./questions";

import {
  showTitleAndBanner,
  showInfo,
  showError,
  getCliOptions,
  cleanCliOptions,
  ICliOptions,
} from "./utils";

import { ProgrammingLanguage } from "./models";

export const cli = async (): Promise<void> => {
  showTitleAndBanner();

  const cliOptions: ICliOptions = getCliOptions();

  const skipConfirmation: Boolean = cliOptions.skipConfirmation || false;

  const author: String | undefined = (
    await generateQuestion(cliOptions.author, skipConfirmation, {
      name: "author",
      message: "Search for author regex? (e.g. '^M')",
      type: QuestionType.INPUT,
    })
  ).author;

  const authorId: String | undefined = (
    await generateQuestion(cliOptions.authorId, skipConfirmation, {
      name: "authorId",
      message: "Search for author edabit id? (e.g. 'BkPgkDQGHm66X4Qai')",
      type: QuestionType.INPUT,
    })
  ).authorId;

  const title: String | undefined = (
    await generateQuestion(cliOptions.title, skipConfirmation, {
      name: "title",
      message: "Search for title regex? (e.g. 'ort$')",
      type: QuestionType.INPUT,
    })
  ).title;

  const edabitId: String | undefined = (
    await generateQuestion(cliOptions.edabitId, skipConfirmation, {
      name: "edabitId",
      message: "Search for edabitId? (e.g. '6vSZmN66xhMRDX8YT')",
      type: QuestionType.INPUT,
    })
  ).edabitId;

  const minDifficulty: Number | undefined = parseFloat(
    (
      await generateQuestion(cliOptions.minDifficulty, skipConfirmation, {
        name: "minDifficulty",
        message: "Search for min difficulty (from 0 to 5)? (e.g. '2.5')",
        type: QuestionType.NUMBER,
      })
    ).minDifficulty as string
  );

  const minQuality: Number | undefined = parseFloat(
    (
      await generateQuestion(cliOptions.minQuality, skipConfirmation, {
        name: "minQuality",
        message: "Search for min quality (from 0 to 5)? (e.g. '2.5')",
        type: QuestionType.NUMBER,
      })
    ).minQuality as string
  );

  const programmingLanguage: ProgrammingLanguage | undefined = (
    await generateQuestion(cliOptions.programmingLanguage, skipConfirmation, {
      name: "programmingLanguage",
      message: "Filter by programming language?",
      type: QuestionType.LIST,
      choices: [
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
      ],
    })
  ).programmingLanguage as ProgrammingLanguage | undefined;

  const tags: String | undefined = (
    await generateQuestion(
      cliOptions.tags as String | Number | undefined,
      skipConfirmation,
      {
        name: "tags",
        message: "Search for tags? (e.g. 'strings, algorithms, sorting')",
        type: QuestionType.INPUT,
      }
    )
  ).tags as String | undefined;

  const resultParams: ICliOptions = cleanCliOptions({
    title,
    edabitId,
    author,
    authorId,
    tags,
    minDifficulty,
    minQuality,
    programmingLanguage,
  });

  if (skipConfirmation) {
    showInfo("Requesting challenge with params:");
    showInfo(`${JSON.stringify(resultParams, null, 2)}`);
  } else {
    const { isConfirmed }: { isConfirmed: Boolean } =
      await confirmParamsQuestion(resultParams);

    if (isConfirmed === true) {
      showInfo("Fetching challenge based on the provided parameters...");
    } else {
      showError("Aborted! No action was taken.");
    }
  }
};
