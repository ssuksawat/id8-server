const Sequelize = require('sequelize');
const env = require('./env');
const logger = require('../util/logger');

const logging = process.env.NODE_ENV !== 'production';

const sequelize = new Sequelize(env.db, { logging: logging });

module.exports = sequelize;

/* Load models */
require('../users/user.model');

sequelize.authenticate()
  .then(() => logger.info('Database connected'))
  .then(() => sequelize.sync())
  .catch(err => logger.error('DB error: ', err));
