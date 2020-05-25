const router = require("express").Router();
const UrlShortener = require("../core/UrlShortener");

/* redirect to a long url associated with the provided short url. */
router.get("/:shortURL", async (req, res, next) => {
  try {
    const { shortURL } = req.params;

    const longURL = await UrlShortener.getLongURL(shortURL);

    res.redirect(longURL);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
