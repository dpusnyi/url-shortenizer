const router = require("express").Router();
const UrlShortener = require("../core/UrlShortener");

/* POST (create) new url mapping for the provided long URL */
router.post("/", async (req, res, next) => {
  try {
    const shortURL = await UrlShortener.generateShortURL(req.body.longURL);

    res.json({ shortURL });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
