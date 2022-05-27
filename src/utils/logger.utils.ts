import { red, green, cyan } from "kleur";
import { textSync } from "figlet";
import { ConsoleMessage } from "../models";

/**
 * Shows the title ASCII art and the banner below it
 *
 */
export const showTitleAndBanner = (): void => {
  console.log(
    cyan(textSync(ConsoleMessage.TITLE, { horizontalLayout: "full" }))
  );
  console.info(cyan(ConsoleMessage.BANNER));
};

/**
 * Shows an error with prefixed message in red
 *
 * @param {string | Error} message - The message to show
 */
export const showError = (message: string | Error): void => {
  console.error(red(ConsoleMessage.ERROR) + message);
};

/**
 * Shows a success message with prefixed message in green
 *
 * @param {string} message - The message to show
 */
export const showSuccess = (message: string): void => {
  console.log(green(ConsoleMessage.SUCCESS) + message);
};

/**
 * Shows and info message with prefixed message in cyan
 *
 * @param {string} message - The message to show
 */
export const showInfo = (message: string): void => {
  console.info(cyan(ConsoleMessage.INFO) + message);
};
