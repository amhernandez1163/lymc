const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    characterCount: Int
    savedCharacters: [Character]
  }

  type Character {
    characterId: ID
    name: String
    description: String
    image: String
    series: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    characters: [Character]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCharacter(
      name: String!
      characterId: String!
      image: String!
      description: String!
      series: String
    ): User
    removeCharacter(characterId: ID!): User
  }
`;

module.exports = typeDefs;
