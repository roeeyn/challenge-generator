import { Challenge } from "../models";
import { showSuccess, showInfo } from "../utils";

export const createFilesFromChallenge = (challenge: Challenge) => {
  showSuccess("Fetched challenge successfully");
  showInfo("Creating files...");
  console.log(challenge);
};
