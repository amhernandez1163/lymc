const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    characterCount: Int
    savedCharacters: [Characters]
  }

  type Characters {
    characterId: ID
    name: String
    description: String
    image: String
  }

  input InputCharacter {
    characterId: String
    name: String
    description: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCharacter(newCharacter: InputCharacter!): User
    removeCharacter(characterId: ID!): User
  }
`;

module.exports = typeDefs;
