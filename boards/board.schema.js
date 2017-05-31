const Board = require('./board.model');
const User = require('../users/user.model');

const boardSchema = `
  type Board {
    id: ID!,
    name: String!,
    createdAt: String!,
    updatedAt: String!,
    user: User
  }
`;

const boardResolvers = {
  Query: {
    boards(root, args, context) {
      return Board.findAll({ where: { userId: context.user.id } });
    }
  },
  Mutation: {
    addBoard(root, { name }, { user }) {
      return Board.create({ name, userId: user.id });
    }
  },
  Board: {
    user({ userId }) {
      return User.findById(userId);
    }
  }
};

module.exports = { boardSchema, boardResolvers };
