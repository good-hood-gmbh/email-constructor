const { readFile } = require('fs');
const config = require('uni-config');
const assets = require('../../build/assets');

const getAsset = assets(config.build.assets_location);


module.exports = (req, res, next) => {
  res.locals.locale = config.server.default_locale;
  res.locals.asset = getAsset;
  res.locals.config = {
    debug: config.debug,
    sandbox: config.sandbox,
    client: config.client,
  };

  next();
};
