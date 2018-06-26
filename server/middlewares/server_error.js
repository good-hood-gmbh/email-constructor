module.exports = (err, req, res) => {
  console.error(err.stack || err);
  res.status(500).end();
};
