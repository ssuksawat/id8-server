const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const { userSchema } = require('../users/user.schema');

const rootSchema = [`
  type Query {
    currentUser: User
  }

  schema {
    query: Query
  }
`];
const rootResolvers = {
  Query: {
    currentUser(root, args, context) {
      return context.user || null;
    }
  }
};

const schema = [...rootSchema, ...userSchema];
const resolvers = merge(rootResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

module.exports = executableSchema;
