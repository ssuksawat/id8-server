const path = require('path');

const env = process.env.NODE_ENV || 'development';
const rootPath = path.join(__dirname, '../');

const config = {
  development: {
    name: 'development',
    rootPath,
    db: process.env.DATABASE_URL || 'postgres://postgres@localhost/id8',
    port: process.env.PORT || 3001,
    logLevel: process.env.LOG_LEVEL || 'debug',
    apiLogLevel: process.env.API_LOG_LEVEL || 'dev',
    secret: process.env.APP_SECRET || 'secret stuff'
  },
  production: {
    name: 'production',
    rootPath,
    db: process.env.DATABASE_URL || 'postgres://postgres@localhost/vboard',
    port: process.env.PORT || 3001,
    logLevel: process.env.LOG_LEVEL || 'error',
    apiLogLevel: process.env.API_LOG_LEVEL || 'tiny',
    secret: process.env.APP_SECRET || 'super secret stuff'
  }
};

module.exports = config[env];
