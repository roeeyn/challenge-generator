const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:5000";

const axios = require("axios");
const { main } = require("./utils/createRepo.js");

const prompt = require("prompt-sync")({ sigint: true });
const { configRepo } = require("./utils/configureRepo.js");

const mainHandler = async () => {
  try {
    const generationNumber = prompt(
      "Write the Prepadawans generation (or alias): "
    );

    const { data } = await axios.get(
      `${BACKEND_HOST}/getChallenges?generationNumber=${generationNumber}`
    );

    const rootFolder = await main(data.files, generationNumber);
    await configRepo(rootFolder, generationNumber);
  } catch (error) {
    console.log("error", error);
    console.log("An error occurred. Please try again.");
    console.log(
      "If you're still getting problems, please send an email to hola@hackademy.mx"
    );
    console.log("or if you prefer, send us a tweet @hackademymx");
  }
};

mainHandler();
