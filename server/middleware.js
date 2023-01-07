module.exports = (req, res, next) => {
  // console.log(req.headers);
  if (req.headers["X-Finnhub-Secret"] === "cesfcrqad3i2r4ra0nt0") {
    res.status(200).send();
  } else {
    next();
  }
};
