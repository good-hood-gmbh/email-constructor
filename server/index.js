require('babel-register')({ extensions: ['.es'] });
const Server = require('./server');


const instance = new Server();
instance.start();
