import {
  cliOptionsToUrlParams,
  camelCaseToSnakeCase,
  camelCaseToKebabCase,
} from "../../src/utils";
import { ICliOptions } from "../../src/models";

type TestCaseParams2URL = [ICliOptions, string];

const cases: TestCaseParams2URL[] = [
  [
    {
      edabitId: "123",
    },
    "edabit_id=123",
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
    "title=my%20title&edabit_id=123&author=Yolanda&author_id=123&tags=%5B%22tag1%22%2C%22tag2%22%5D&min_difficulty=1.5&min_quality=3&programming_language=javascript",
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

type TestCaseCases = [string, string];
const snakeCaseCases: TestCaseCases[] = [
  ["title", "title"],
  ["myOtherId", "my_other_id"],
];

describe("Test snake case", () => {
  test.each(snakeCaseCases)("Given %p, expect %p", (input, expected) => {
    expect(camelCaseToSnakeCase(input)).toBe(expected);
  });
});

const kebabCaseCases: TestCaseCases[] = [
  ["title", "title"],
  ["myOtherId", "my-other-id"],
];

describe("Test kebab case", () => {
  test.each(kebabCaseCases)("Given %p, expect %p", (input, expected) => {
    expect(camelCaseToKebabCase(input)).toBe(expected);
  });
});
