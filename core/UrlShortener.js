const LongUrl = require("../mongo/models/LongUrl");
const Mapping = require("../mongo/models/Mapping");
const { createRandomStr, createError } = require("./helpers");

module.exports = {
  generateShortURL: async (requestedLongURL) => {
    // validate input
    let value;
    try {
      // try to generate valid URL from input
      if (!requestedLongURL.includes("://")) {
        value = new URL("http://" + requestedLongURL).href;
      } else {
        value = new URL(requestedLongURL).href;
      }
    } catch (e) {
      if (e instanceof TypeError) {
        throw createError("Provide valid URL", 400);
      } else throw e;
    }

    if (value.length > 2048) {
      throw createError("parsed URL should not be longer than 2048", 400);
    }

    let longURL = await LongUrl.findOne({ value });

    if (!longURL) {
      longURL = new LongUrl({ value });
      await longURL.save();
    }

    let shortURL;
    let alreadyExists;

    do {
      shortURL = await createRandomStr(11);
      alreadyExists = await Mapping.findOne({ shortURL });
    } while (alreadyExists);

    const mapping = new Mapping({ shortURL, longURL: longURL._id });

    mapping.save();

    return process.env.APP_PREFIX + mapping.shortURL;
  },

  getLongURL: async (shortURL) => {
    const mapping = await Mapping.findOne({ shortURL }).populate("longURL");

    if (!mapping) {
      throw createError("URL not found", 404);
    }

    if (mapping.expiresOn < new Date()) {
      throw createError("link is expired!", 410);
    }

    return mapping.longURL.value;
  },
};
