import { red, green, cyan } from "kleur";
import { textSync } from "figlet";
import { ConsoleMessage } from "../models/consoleMessage";

const newLine = "\n";

export const showTitleAndBanner = (): void => {
  console.log(
    cyan(textSync(ConsoleMessage.TITLE, { horizontalLayout: "full" }))
  );
  console.info(cyan(ConsoleMessage.BANNER));
};

export const showError = (message: string | Error): void => {
  console.error(red(ConsoleMessage.ERROR) + message);
};

export const showSuccess = (message: string): void => {
  console.log(green(ConsoleMessage.SUCCESS) + message + newLine);
};

export const showInfo = (message: string): void => {
  console.info(cyan(ConsoleMessage.INFO) + message + newLine);
};
