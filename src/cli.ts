import {
  authorIdQuestion,
  authorQuestion,
  challengeTitleQuestion,
  confirmParamsQuestion,
  edabitIdQuestion,
  minDifficultyQuestion,
  minQualityQuestion,
  programmingLanguageQuestion,
  tagsQuestion,
} from "./questions";

import {
  showTitleAndBanner,
  showInfo,
  showError,
  getCliOptions,
  ICliOptions,
} from "./utils";

export const cli = async (): Promise<void> => {
  showTitleAndBanner();

  const cliOptions: ICliOptions = getCliOptions();

  const skipConfirmation: Boolean = cliOptions.skipConfirmation || false;

  const title: String =
    cliOptions.title ||
    (skipConfirmation ? "" : (await challengeTitleQuestion()).title);

  const edabitId: String =
    cliOptions.edabitId ||
    (skipConfirmation ? "" : (await edabitIdQuestion()).edabitId);

  const author: String =
    cliOptions.author ||
    (skipConfirmation ? "" : (await authorQuestion()).author);

  const authorId: String =
    cliOptions.authorId ||
    (skipConfirmation ? "" : (await authorIdQuestion()).authorId);

  const tags: String =
    cliOptions.tags || (skipConfirmation ? "" : (await tagsQuestion()).tags);

  const minDifficulty: Number = +(
    cliOptions.minDifficulty ||
    (skipConfirmation ? 0 : (await minDifficultyQuestion()).minDifficulty)
  );

  const minQuality: Number = +(
    cliOptions.minQuality ||
    (skipConfirmation ? 0 : (await minQualityQuestion()).minQuality)
  );

  const programmingLanguage: String =
    cliOptions.programmingLanguage ||
    (skipConfirmation
      ? ""
      : (await programmingLanguageQuestion()).programmingLanguage);

  const resultParams: ICliOptions = {
    title,
    edabitId,
    author,
    authorId,
    tags,
    minDifficulty,
    minQuality,
    programmingLanguage,
  };

  if (skipConfirmation) {
    showInfo("Requestion challenge with params:");
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
