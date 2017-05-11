const Board = require('./board.model');

const boardSchema = `
  type Board {
    id: ID!,
    name: String!,
    createdAt: String!,
    updatedAt: String!
  }
`;

const boardResolvers = {
  Query: {
    boards(root, args, context) {
      return Board.findAll({ where: { userId: context.user.id } });
    }
  }
};

module.exports = { boardSchema, boardResolvers };
