const config = require('uni-config');
const gulp = require('gulp');
const del = require('del');
const sequence = require('run-sequence');
const bundle = require('./build/bundle');
const styles = require('./build/styles');
const i18n = require('./build/i18n');
const uglify = require('./build/uglify');
const cleancss = require('./build/cleancss');
const revision = require('./build/revision');
const gzip = require('./build/gzip');


const ASSETS = config.build.assets_location;

gulp.task('bundle', (done) => {
  bundle({
    name: 'app.js',
    entries: `${__dirname}/client/index.es`,
    cacheFile: `${__dirname}/bundle-cache.json`,
    dest: ASSETS,
  }, done);
});

gulp.task('polyfills', (done) => {
  bundle({
    name: 'polyfills.js',
    entries: `${__dirname}/client/polyfills.js`,
    dest: ASSETS,
  }, done);
});

gulp.task('i18n', (done) => {
  i18n({ dest: ASSETS }, done);
});

gulp.task('styles', (done) => {
  styles({
    name: 'app.css',
    source: `${__dirname}/styles/index.styl`,
    dest: ASSETS,
    paths: [
      `${__dirname}/node_modules`,
      `${__dirname}/client`,
    ],
  }, done);
});

gulp.task('watch', () => {
  require('./build/watch')({
    baseDir: __dirname,
    bundleTask: 'bundle',
    stylusTask: 'styles',
    i18nTask: 'i18n',
  });
});

gulp.task('server', () => {
  require('./build/nodemon')({ baseDir: __dirname });
});

gulp.task('default', (done) => {
  sequence(
    [
      'bundle',
      'polyfills',
      'i18n',
      'styles',
    ],
    'watch',
    'server',
    done,
  );
});

gulp.task('clean', () => (
  del([`${ASSETS}/*.*`])
));

gulp.task('uglify', (done) => {
  uglify({ src: `${ASSETS}/*.js`, dest: ASSETS }, done);
});

gulp.task('cleancss', (done) => {
  cleancss({ src: `${ASSETS}/app.css`, dest: ASSETS }, done);
});

gulp.task('revision', (done) => {
  revision({ folder: ASSETS }, done);
});

gulp.task('gzip', (done) => {
  gzip({ folder: ASSETS }, done);
});

gulp.task('build', (done) => {
  sequence(
    'clean',
    [
      'bundle',
      'polyfills',
      'i18n',
      'styles',
    ],
    [
      'uglify',
      'cleancss',
    ],
    'revision',
    'gzip',
    done,
  );
});
