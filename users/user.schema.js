const userSchema = [`
  type User {
    id: ID!,
    email: String!,
    password: String!,
    fullName: String!,
    googleId: String,
    photo: String
  }
`];

module.exports = { userSchema };
