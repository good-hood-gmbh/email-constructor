const config = require('uni-config');
const { readdirSync } = require('fs');
const gulp = require('gulp');
const browserify = require('browserify');
const pump = require('pump');
const source = require('vinyl-source-stream');


const i18nDir = `${__dirname}/../i18n`;

const createLocaleFile = (dest, locale, done) => {
  const bundleInstance = browserify({
    debug: config.debug,
    standalone: '__appLocale__',
    entries: `${i18nDir}/${locale}`,
  });

  pump(
    bundleInstance.bundle(),
    source(`locale-${locale.replace('.json', '')}.js`),
    gulp.dest(dest),
    done,
  );
};

module.exports = (options, done) => {
  const { dest } = options;

  const locales = readdirSync(i18nDir);

  let callbackCount = 0;
  let isError = false;
  const callback = (err) => {
    if (isError) return;
    if (err) {
      isError = true;
      return done(err);
    }

    callbackCount += 1;
    if (callbackCount === locales.length) done();
  };

  locales.forEach((locale) => {
    createLocaleFile(dest, locale, callback);
  });
};
