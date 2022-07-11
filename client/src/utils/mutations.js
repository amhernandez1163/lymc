import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        characterCount
        savedCharacters {
          name
          description
          characterId
          image
        }
      }
    }
  }
`;

export const SAVE_CHARACTER = gql`
  mutation saveCharacter($newCharacter: InputCharacter!) {
    saveCharacter(newCharacter: $newCharacter) {
      _id
      username
      email
      savedCharacters {
        characterId
        name: String
        description: String
        image: String
      }
    }
  }
`;

export const REMOVE_CHARACTER = gql`
  mutation removeCharacter($characterId: ID!) {
    removeBook(characterId: $characterId) {
      _id
      username
      email
      savedCharacters {
        characterId
        name: String
        description: String
        image: String
      }
    }
  }
`;
