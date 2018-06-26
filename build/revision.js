const gulp = require('gulp');
const pump = require('pump');
const rev = require('gulp-rev');


module.exports = (options, done) => {
  const { folder } = options;

  pump(
    gulp.src(`${folder}/*.min.*`, { base: folder }),
    rev(),
    gulp.dest(folder),
    rev.manifest(),
    gulp.dest(folder),
    done,
  );
};
