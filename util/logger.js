const winston = require('winston');
const env = require('../config/env');

winston.level = env.logLevel;

module.exports = winston;
