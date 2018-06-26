const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


module.exports = (options, done) => {
  const { src, dest } = options;

  pump(
    gulp.src(src),
    uglify({
      compress: { drop_console: true },
      output: { max_line_len: 64000 },
    }),
    rename({ suffix: '.min' }),
    gulp.dest(dest),
    done,
  );
};
