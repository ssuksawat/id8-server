const passport = require('passport');
const AuthRouter = require('../auth/auth.routes');

module.exports = (app, env) => {
  app.use('/auth', AuthRouter);

  app.use('/api', passport.authenticate('jwt', { session: false }));
  app.get('/api/*', (req, res) => res.sendStatus(200));
};
