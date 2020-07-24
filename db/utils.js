const { Exercise } = require("./model.js");

module.exports.getExercises = difficulty =>
  new Promise((resolve, reject) => {
    Exercise.countDocuments({
      difficulty,
    }).exec((err, count) => {
      const randNumber = Math.floor(Math.random() * count);

      Exercise.findOne({
        difficulty,
      })
        .skip(randNumber)
        .exec((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  });
