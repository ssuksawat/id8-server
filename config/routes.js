const passport = require('passport');
const { graphqlExpress } = require('graphql-server-express');
const schema = require('./schema');
const AuthRouter = require('../auth/auth.routes');

module.exports = (app, env) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use('/graphiql', require('../util/graphiql')('/api/graphql'));
  }

  app.use('/auth', AuthRouter);

  app.use('/api', passport.authenticate('jwt', { session: false }));
  app.use('/api/graphql', graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  })));
};
