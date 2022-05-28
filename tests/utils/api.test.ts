import { cliOptionsToUrlParams } from "../../src/utils";
import { ICliOptions } from "../../src/models";

type TestCaseParams2URL = [ICliOptions, string];

const cases: TestCaseParams2URL[] = [
  [
    {
      edabitId: "123",
    },
    "edabit-id=123",
  ],
  [
    {
      title: "my title",
      edabitId: "123",
      author: "Yolanda",
      authorId: "123",
      tags: ["tag1", "tag2"],
      minDifficulty: 1.5,
      minQuality: 3,
      programmingLanguage: "javascript",
    },
    "title=my%20title&edabit-id=123&author=Yolanda&author-id=123&tags=%5B%22tag1%22%2C%22tag2%22%5D&min-difficulty=1.5&min-quality=3&programming-language=javascript",
  ],
];

describe("Test CLI options to URL params", () => {
  test.each(cases)(
    "Given %p, expect %p",
    (cliOptions: ICliOptions, expectedUrlParams: string) => {
      expect(cliOptionsToUrlParams(cliOptions as ICliOptions)).toBe(
        expectedUrlParams
      );
    }
  );
});
