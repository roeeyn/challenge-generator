import { cliOptionsToUrlParams } from "../../src/utils";
import { ICliOptions } from "../../src/models";

const cliOptions: ICliOptions = {
  edabitId: "123",
};

describe("Test CLI options to URL params", () => {
  test("Camel case should be separated by hyphens", () => {
    expect(cliOptionsToUrlParams(cliOptions)).toBe("edabit-id=123");
  });
});
