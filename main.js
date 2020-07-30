const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:5000";

const axios = require("axios");
const { main } = require("./utils/createRepo.js");

const prompt = require("prompt-sync")({ sigint: true });

const generationNumber = prompt(
  "Write the Prepadawans generation (or alias): "
);

axios
  .get(`${BACKEND_HOST}/getChallenges?generationNumber=${generationNumber}`)
  .then(({ data }) => main(data.files, generationNumber))
  .catch(error => console.error(error));
