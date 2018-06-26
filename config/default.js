module.exports = {
  server: {
    host: 'localhost',
    port: 3000,
    default_locale: 'de-DE',
  },

  client: {
    api_root: 'http://localhost:2000',
  },

  build: {
    assets_location: `${__dirname}/../public/assets`,
  },
};
