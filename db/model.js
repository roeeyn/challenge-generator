const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedBy: {
    type: String,
    required: true,
  },
  publishedByUrl: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  tags: {
    required: true,
    type: [String],
  },
  tests: {
    required: true,
    type: [String],
  },
  url: {
    type: String,
    required: true,
  },
  starterFn: {
    type: [String],
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

module.exports.Exercise = mongoose.model("Exercise", exerciseSchema);
