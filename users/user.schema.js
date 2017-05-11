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

const userResolvers = {
  Query: {
    currentUser(root, args, context) {
      return context.user || null;
    }
  }
};

module.exports = { userSchema, userResolvers };
