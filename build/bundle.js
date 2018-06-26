const config = require('uni-config');
const gulp = require('gulp');
const browserify = require('browserify');
const pump = require('pump');
const source = require('vinyl-source-stream');


const defaultOptions = {
  debug: config.debug,
  extensions: ['.es', '.js'],
  cacheFile: null,
  paths: [`${__dirname}/../node_modules`],
};

module.exports = (options, done) => {
  const { dest, name, cacheFile, ...cleanOptions } = options;
  const bundleOptions = { ...defaultOptions, ...cleanOptions };

  let bundleInstance;
  if (config.debug && cacheFile) {
    const incremental = require('browserify-incremental');
    bundleInstance = browserify({ ...bundleOptions, ...incremental.args });
    incremental(bundleInstance, { cacheFile });
  } else {
    bundleInstance = browserify(bundleOptions);
  }

  pump(
    bundleInstance.bundle(),
    source(name),
    gulp.dest(options.dest),
    done,
  );
};
