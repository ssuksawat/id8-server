module.exports = (app, env) => {
  app.get('/api/*', (req, res) => res.sendStatus(200));
};
