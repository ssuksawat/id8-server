const userSchema = `
  type User {
    id: ID!,
    email: String!,
    password: String!,
    fullName: String!,
    googleId: String,
    photo: String
  }
`;

const userQueries = `
  me: User
`;

const userResolvers = {
  Query: {
    me(root, args, context) {
      return context.user || null;
    }
  }
};

module.exports = { userSchema, userQueries, userResolvers };
