import { ProgrammingLanguage } from "../models";

export type ChallengeApiResponse = {
  _id: String;
  author: String;
  author_edabit_id: String;
  difficulty: Number;
  edabit_id: String;
  programming_language: ProgrammingLanguage;
  quality: Number;
  raw_code: String;
  raw_instructions: String;
  raw_tests: String;
  summary: String;
  tags: String[];
  title: String;
};

export type Challenge = {
  _id: String;
  author: String;
  authorEdabitId: String;
  difficulty: Number;
  edabitId: String;
  programmingLanguage: ProgrammingLanguage;
  quality: Number;
  rawCode: String;
  rawInstructions: String;
  rawTests: String;
  summary: String;
  tags: String[];
  title: String;
};
