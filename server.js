const express = require('express');
const env = require('./config/env');
const logger = require('./util/logger');

const app = express();

require('./config/sequelize');
require('./config/passport');
require('./config/middleware')(app, env);
require('./config/routes')(app, env);

app.listen(env.port, () => {
  logger.info('Listening on port %d', env.port);
});

app.on('SIGINT', () => {
  // clean up code here
  logger.info('Server shutting down');
});

module.exports = app;
