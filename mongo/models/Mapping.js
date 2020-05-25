const { Schema, model } = require("mongoose");

const modelName = "Mapping";

const schema = new Schema({
  shortURL: {
    type: String,
    unique: true,
    dropDups: true,
    maxlength: 11,
    required: true,
  },

  longURL: {
    type: Schema.Types.ObjectId,
    ref: "LongUrl",
    required: true,
  },

  expiresOn: {
    type: Date,
    default: () =>
      new Date(new Date().getTime() + process.env.URL_EXPIRY * 1000),
  },
});

module.exports = model(modelName, schema);
