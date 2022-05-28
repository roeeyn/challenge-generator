export interface ICliOptions {
  title?: String;
  edabitId?: String;
  author?: String;
  authorId?: String;
  tags?: String | String[];
  minDifficulty?: String | Number;
  minQuality?: String | Number;
  programmingLanguage?: String;
  skipConfirmation?: Boolean;
}

export type CleanCliOptionsType = String | Number | Boolean | String[];
