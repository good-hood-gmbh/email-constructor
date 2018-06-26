const config = require('uni-config');
const express = require('express');
const domainMiddleware = require('express-domain-middleware');
const morgan = require('morgan');
const helmet = require('helmet');
const locals = require('./middlewares/locals');

const { server: serverConfig } = config;


class Server {
  constructor() {
    const app = express();
    this.app = app;
  }

  preRouteMiddleware() {
    const { app } = this;

    app.use(domainMiddleware);
    app.use(helmet());

    app.use(morgan(config.debug ? 'dev' : 'combined'));

    if (config.debug) {
      app.use(require('serve-favicon')(`${__dirname}/../public/favicon.ico`));
      app.use(require('serve-static')(`${__dirname}/../public`, { redirect: false }));
    }

    app.use(locals);

    if (config.debug) {
      app.use(require('connect-livereload')());
    }
  }

  postRouteMiddleware() {
    const { app } = this;

    if (config.debug) {
      app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));
    } else {
      app.use(require('./middlewares/server_error'));
    }
  }

  startCallback() {
    console.info(`website server running on ${serverConfig.host}:${serverConfig.port}`);
  }

  start() {
    const { app } = this;

    app.set('port', serverConfig.port);
    app.set('views', `${__dirname}/../templates`);
    app.set('view engine', 'pug');
    if (config.debug) app.set('json spaces', 2);

    this.preRouteMiddleware();
    app.get('*', (req, res) => { res.render('index'); });
    this.postRouteMiddleware();

    app.listen(serverConfig.port, serverConfig.host, this.startCallback);
  }
}

module.exports = Server;
