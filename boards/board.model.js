const { STRING, INTEGER } = require('sequelize');
const sequelize = require('../config/sequelize');

const Board = sequelize.define('board', {
  name: { type: STRING, required: true, unique: 'compositeIndex' },
  userId: { type: INTEGER, required: true, unique: 'compositeIndex' }
});

module.exports = Board;
