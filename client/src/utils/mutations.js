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
	mutation saveCharacter(
		$name: String!
		$characterId: String!
		$image: String!
		$description: String!
		$series: String
	) {
		saveCharacter(
			name: $name
			characterId: $characterId
			image: $image
			description: $description
			series: $series
		) {
			_id
			username
			email
			savedCharacters {
				characterId
				name
				description
				image
				series
			}
		}
	}
`;
