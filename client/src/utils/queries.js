import { gql } from "apollo/client";

export const GET_ME = gql`
  {
    me {
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
`;
