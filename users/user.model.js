const { STRING } = require('sequelize');
const sequelize = require('../config/sequelize');
const encryption = require('../util/encryption');

const User = sequelize.define('user', {
  email: { type: STRING, required: true, unique: true },
  password: { type: STRING },
  fullName: { type: STRING, required: true },
  googleId: STRING,
  photo: STRING
}, {
  indexes: [
    { method: 'BTREE', fields: ['fullName'] },
    { method: 'BTREE', fields: ['email'] }
  ]
});

module.exports = User;

User.beforeCreate((user) => {
  if (!user.password) { return Promise.resolve(user); }
  return encryption.hashPassword(user.password)
    .then(hashedPw => {
      user.password = hashedPw;
    });
});
