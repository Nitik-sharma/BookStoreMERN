const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("cat", bookModel);
