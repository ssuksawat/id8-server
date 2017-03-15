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
    secret: process.env.APP_SECRET || 'secret stuff',
    googleAuth: {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback'
    }
  },
  production: {
    name: 'production',
    rootPath,
    db: process.env.DATABASE_URL || 'postgres://postgres@localhost/vboard',
    port: process.env.PORT || 3001,
    logLevel: process.env.LOG_LEVEL || 'error',
    apiLogLevel: process.env.API_LOG_LEVEL || 'tiny',
    secret: process.env.APP_SECRET || 'super secret stuff',
    googleAuth: {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
    }
  }
};

module.exports = config[env];
