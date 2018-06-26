const gulp = require('gulp');
const watch = require('gulp-watch');
const livereload = require('livereload');


const pathNormalize = (path) => (path.replace(`${__dirname}/../`, ''));
const triggerTaskAction = (task) => (
  (event) => {
    console.info(`File ${pathNormalize(event.path)} was changed`);
    gulp.start(task);
  }
);

const browserifyWatch = (baseDir) => [
  `${baseDir}/client/**/*.es`,
];

const stylusWatch = (baseDir) => [
  `${baseDir}/styles/**/*.styl`,
  `${baseDir}/client/**/*.styl`,
];

const livereloadWatch = (baseDir) => [
  `${baseDir}/public/assets`,
];

const localeWatch = () => [
  `${__dirname}/../i18n/**/*.*`,
];

module.exports = (options) => {
  const { baseDir, bundleTask, stylusTask, i18nTask } = options;

  watch(browserifyWatch(baseDir), triggerTaskAction(bundleTask));
  watch(stylusWatch(baseDir), triggerTaskAction(stylusTask));
  watch(localeWatch(), triggerTaskAction(i18nTask));

  const server = livereload.createServer();
  server.watch(livereloadWatch(baseDir));
};
