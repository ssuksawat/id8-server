const jwt = require('jsonwebtoken');
const { graphiqlExpress } = require('graphql-server-express');
const env = require('../config/env');

const testUserEmail = env.testUserAccount.email;
const testToken = jwt.sign({ email: testUserEmail }, env.secret, { expiresIn: '7d' });

const getGraphiqlRoute = (endpointURL) => graphiqlExpress({
  endpointURL: endpointURL,
  passHeader: `'Authorization': 'JWT ${testToken}'`
});

module.exports = getGraphiqlRoute;
