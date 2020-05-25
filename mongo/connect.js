const mongoose = require("mongoose");

const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports = async function connect() {
  return mongoose.connect(process.env.MONGO_URL, MONGOOSE_OPTIONS);
};
