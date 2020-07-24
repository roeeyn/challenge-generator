const dotenv = require("dotenv");
dotenv.config();

const { connect2db } = require("./db/db.js");

const map = require("awaity/map");
const { each } = require("awaity/esm");

const { getExercises } = require("./db/utils.js");
const { createRepo, createChallengesFolder } = require("./utils/createRepo.js");

connect2db()
  .then(async dbConnection => {
    console.log("Connected to the DB");
    try {
      const difficulties = [
        "very easy",
        "easy",
        "medium",
        "hard",
        "very hard",
        "expert",
      ];

      const exercises = await map.default(
        difficulties,
        async difficulty => await getExercises(difficulty)
      );

      const folderName = createChallengesFolder(7);

      await each(exercises, async (exercise, idx) => {
        await createRepo(exercise, idx, folderName);
      });
    } catch (error) {
      console.log(error);
    } finally {
      dbConnection.disconnect(() => console.log("Disconnected from the db"));
    }
  })
  .catch(err => console.log(err));
