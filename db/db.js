const mongoose = require("mongoose");

const dbUser = process.env.DB_USERNAME || "root";
const dbPassword = process.env.DB_PASSWORD || "root";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || "27017";
const dbSchema = process.env.DB_SCHEMA || "ProgrammingClub";
const dbOptions = "authSource=admin&readPreference=primary&ssl=false";

const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbSchema}?${dbOptions}`;

module.exports.connect2db = () =>
    new Promise((resolve, reject) => {
        const connection = mongoose.connect(
            connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            error => (error ? reject(error) : resolve(connection))
        );
    });
