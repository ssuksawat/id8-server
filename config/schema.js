const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const { userSchema, userQueries, userResolvers } = require('../users/user.schema');
const { boardSchema, boardQueries, boardMutations, boardResolvers } = require('../boards/board.schema');

const rootSchema = `
  type Query {
    ${userQueries},
    ${boardQueries}
  }

  type Mutation {
    ${boardMutations}
  }

  schema {
    query: Query,
    mutation: Mutation
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
