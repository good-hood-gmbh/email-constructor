const nodemon = require('gulp-nodemon');


module.exports = (options) => {
  const { baseDir } = options;

  const nodemonOptions = {
    ext: 'js json es',
    script: `${baseDir}/server/index.js`,
    watch: [
      `${__dirname}/../config/*`,
      `${baseDir}/server/*`,
    ],
  };

  nodemon(nodemonOptions);
};
