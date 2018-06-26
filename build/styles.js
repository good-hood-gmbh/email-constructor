const gulp = require('gulp');
const pump = require('pump');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');


const defaultOptions = {
  'include css': true,
  paths: [
    `${__dirname}/../node_modules`,
  ],
};

module.exports = (options, done) => {
  const { source, name, dest, ...cleaOptions } = options;
  const stylusOptions = { ...defaultOptions, ...cleaOptions };

  pump(
    gulp.src(source),
    stylus(stylusOptions),
    rename(name),
    gulp.dest(dest),
    done,
  );
};
