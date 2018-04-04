const { parse } = require('path');
const { readdirSync, readFileSync, writeFile } = require('fs');
const gulp = require('gulp');
const watch = require('gulp-watch');
const sequence = require('run-sequence');
const handlebars = require('handlebars');
const juice = require('juice');
const config = require('./src/js/config')


const TEMPLATE_DIR = `${__dirname}/templates/nebenan`

juice.styleToAttribute = {
  ...juice.styleToAttribute,
  border: 'border',
  cellpadding: 'cellpadding',
  cellspacing: 'cellspacing',
};

const helpers = {
  local_image_url: (image) => `images/${image}`,
  image_url: (image) => `${config.static_root}/newsletter_assets/${image}`,
};


// Utils
const readTemplate = (name) => readFileSync(`${TEMPLATE_DIR}/src/${name}`, { encoding: 'utf8' });
const writeTemplate = (name, html, callback) => writeFile(`${TEMPLATE_DIR}/${name}`, html, callback);

const registerPartials = () => {
  const files = readdirSync(`${TEMPLATE_DIR}/src/partials`);
  files.forEach((file) => {
    const { name } = parse(file);
    handlebars.registerPartial(name, readTemplate(`partials/${file}`));
  });
};

const registerHelpers = () => {
  Object.keys(helpers).forEach((key) => {
    handlebars.registerHelper(key, helpers[key])
  });
};

const pathNormalize = (path) => (path.replace(`${__dirname}/../`, ''));
const triggerTaskAction = (task) => (
  (event) => {
    console.info(`File ${pathNormalize(event.path)} was changed`);
    gulp.start(task);
  }
);


// Init
registerHelpers();


// Tasks
gulp.task('compile', (done) => {
  registerPartials();
  const html = handlebars.compile(readTemplate('index.hbs'))();
  writeTemplate('template-nebenan.html', html, done);
});

gulp.task('juicify', (done) => {
  const options = {
    preserveImportant: true,
    removeStyleTags: false,
    webResources: {
      images: false,
    },
  };

  juice.juiceFile(`${TEMPLATE_DIR}/template-nebenan.html`, options, (err, html) => {
    if (err) return done(err);
    writeTemplate('template-nebenan.html', html, done);
  });
});

gulp.task('watch', () => {
  const list = [
    `${TEMPLATE_DIR}/src/**/*.hbs`,
    `${TEMPLATE_DIR}/src/styles/**/*.css`,
  ];

  watch(list, triggerTaskAction('build'));
});

gulp.task('build', (done) => {
  sequence(
    'compile',
    'juicify',
    done,
  );
});

gulp.task('default', (done) => {
  sequence(
    'build',
    'watch',
    done,
  );
});
