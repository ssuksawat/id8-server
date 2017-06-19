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

const boardQueries = `
  boards: [Board]
`;

const boardMutations = `
  addBoard (name: String!) : Board,
  changeBoardName (id: ID!, name: String!) : Board,
  deleteBoard (id: ID!) : Board
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
    },
    async changeBoardName(root, { id, name }, { user }) {
      let board = await Board.findById(id);
      console.log('Board: ', board);
      if (!board) { throw new Error(`Board with id ${id} does not exist`); }
      if (board.userId !== user.id) { throw new Error('Unauthorized'); }
      board.name = name;
      return board.save();
    },
    async deleteBoard(root, { id }, { user }) {
      let board = await Board.findById(id);
      if (!board) { throw new Error(`Board with id ${id} does not exist`); }
      if (board.userId !== user.id) { throw new Error('Unauthorized'); }
      await board.destroy();
      return board;
    }
  },
  Board: {
    user({ userId }) {
      return User.findById(userId);
    }
  }
};

module.exports = {
  boardSchema,
  boardQueries,
  boardMutations,
  boardResolvers
};
