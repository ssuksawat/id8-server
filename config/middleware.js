const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

module.exports = (app, env) => {
  app.use(helmet());
  app.use(morgan(env.apiLogLevel));
  app.use(bodyParser.json());
  app.use(passport.initialize());
};
