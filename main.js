const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:5000";

const axios = require("axios");
const { main } = require("./utils/createRepo.js");

const generationNumber = 69;

axios
  .get(`${BACKEND_HOST}/getChallenges?generationNumber=${generationNumber}`)
  .then(({ data }) => main(data.files, generationNumber))
  .catch(error => console.error(error));
