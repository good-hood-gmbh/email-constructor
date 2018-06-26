const config = require('uni-config');

const MANIFEST_FILE = 'rev-manifest.json';


const dummy = (name) => `/assets/${name}`;

module.exports = (location) => {
  if (config.debug) return dummy;

  const assetsHash = {};
  const manifest = require(`${location}/${MANIFEST_FILE}`);

  Object.keys(manifest).forEach((key) => {
    assetsHash[key.replace('.min', '')] = manifest[key];
  });

  return (name) => `/assets/${assetsHash[name]}`;
};
