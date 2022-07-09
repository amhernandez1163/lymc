import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user: {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
<<<<<<< HEAD
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user: {
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
=======
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
>>>>>>> f38df8f48be433df46fbf258651dc2319f2c97ba
        }
      }
    }
  }
`;

// export const SAVE_CHARACTER = gql`
// mutation saveCharacter($)
// `;
