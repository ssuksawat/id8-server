const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const { userSchema, userResolvers } = require('../users/user.schema');
const { boardSchema, boardResolvers } = require('../boards/board.schema');

const rootSchema = `
  type Query {
    currentUser: User,
    boards: [Board]
  }

  schema {
    query: Query
  }
`;
const rootResolvers = { Query: {} };

const schema = [rootSchema, userSchema, boardSchema];
const resolvers = merge(rootResolvers, userResolvers, boardResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

module.exports = executableSchema;
