const jwt = require('jsonwebtoken');
const env = require('../config/env');
const encryption = require('../utils/encryption');
const User = require('../users/user.model');

module.exports = {
  login,
  oauthSuccess,
  signup
};

/***** PUBLIC *****/

function login(req, res) {
  let currentUser;
  delayFor(1000)
    .then(() => User.findOne({ where: { email: req.body.email } }))
    .then(user => {
      if (!user) { throw new Error('User does not exist'); }
      currentUser = user;
      return encryption.comparePassword(req.body.password, user.password);
    })
    .then(match => {
      if (!match) { throw new Error('Wrong password'); }
      return jwt.sign({ email: req.body.email }, env.secret, { expiresIn: '7d' });
    })
    .then(token => {
      res.send({ token, user: getUserInfo(currentUser) });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}

function oauthSuccess(req, res) {
  if (!req.user) { return res.status(404).send({ message: 'Login failed' }); }
  const user = req.user;
  const token = jwt.sign({ email: user.email }, env.secret, { expiresIn: '7d' });
  return res.redirect(`/oauthsuccess?token=${token}&id=${user.id}&email=${user.email}&fullName=${user.fullName}&photo=${user.photo}`);
}

function signup(req, res) {
  delayFor(1000)
    .then(() => User.create(req.body))
    .then(user => {
      const token = jwt.sign({ email: user.email }, env.secret, { expiresIn: '7d' });
      res.send({ token, user: getUserInfo(user) });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}

/***** PRIVATE *****/

function getUserInfo(user) {
  return { id: user.id, fullName: user.fullName, photo: user.photo, email: user.email };
}

function delayFor(duration = 0) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
