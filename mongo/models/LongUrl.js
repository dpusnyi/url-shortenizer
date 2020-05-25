const { Schema, model } = require("mongoose");

const modelName = "LongUrl";

const schema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    maxlength: 2048,
  },
});

module.exports = model(modelName, schema);
