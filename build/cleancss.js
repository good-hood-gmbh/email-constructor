const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');


module.exports = (options, done) => {
  const { src, dest } = options;

  pump(
    gulp.src(src),
    cleancss(),
    rename({ suffix: '.min' }),
    gulp.dest(dest),
    done,
  );
};
