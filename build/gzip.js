const gulp = require('gulp');
const pump = require('pump');
const gzip = require('gulp-gzip');


module.exports = (options, done) => {
  const { folder } = options;

  pump(
    gulp.src(`${folder}/*.min.*`),
    gzip(),
    gulp.dest(folder),
    done,
  );
};
