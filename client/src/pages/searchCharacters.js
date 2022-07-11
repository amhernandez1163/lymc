import React, { useState, useEffect } from "react";
import {
	Jumbotron,
	Container,
	Col,
	Form,
	Button,
	Card,
	CardColumns,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { saveCharacterIds, getSavedCharacterIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

const SearchCharacters = () => {
	const [searchedCharacters, setSearchedCharacters] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [savedCharacterIds, setSavedCharacterIds] = useState(
		getSavedCharacterIds()
	);

	const [saveCharacter, { error }] = useMutation(SAVE_BOOK);

	useEffect(() => {
		return () => saveCharacterIds(savedCharacterIds);
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const { items } = await response.json();

			const characterData = items.map((character) => ({
				characterId: character.id,
				authors: character.volumeInfo.authors || ["No author to display"],
				title: character.volumeInfo.title,
				description: character.volumeInfo.description,
				image: character.volumeInfo.imageLinks?.thumbnail || "",
			}));

			setSearchedCharacters(characterData);
			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleSaveCharacter = async (characterId) => {
		const characterToSave = searchedCharacters.find(
			(character) => character.characterId === characterId
		);
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await saveCharacter({
				variables: { newCharacter: { ...characterToSave } },
			});

			setSavedCharacterIds([...savedCharacterIds, characterToSave.characterId]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Jumbotron fluid className="text-light bg-dark">
				<Container>
					<h1>Search for Characters!</h1>
					<Form onSubmit={handleFormSubmit}>
						<Form.Row>
							<Col xs={12} md={8}>
								<Form.Control
									name="searchInput"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									type="text"
									size="lg"
									placeholder="Search for a character"
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button type="submit" variant="success" size="lg">
									Submit Search
								</Button>
							</Col>
						</Form.Row>
					</Form>
				</Container>
			</Jumbotron>

			<Container>
				<h2>
					{searchedCharacters.length
						? `Viewing ${searchedCharacters.length} results:`
						: "Search for a character to begin"}
				</h2>
				<CardColumns>
					{searchedCharacters.map((character) => {
						return (
							<Card key={character.characterId} border="dark">
								{character.image ? (
									<Card.Img
										src={character.image}
										alt={`The cover for ${character.title}`}
										variant="top"
									/>
								) : null}
								<Card.Body>
									<Card.Title>{character.title}</Card.Title>
									<p className="small">Authors: {character.authors}</p>
									<Card.Text>{character.description}</Card.Text>
									{Auth.loggedIn() && (
										<Button
											disabled={savedCharacterIds?.some(
												(savedCharacterId) =>
													savedCharacterId === character.characterId
											)}
											className="btn-block btn-info"
											onClick={() => handleSaveCharacter(character.characterId)}
										>
											{savedCharacterIds?.some(
												(savedCharacterId) =>
													savedCharacterId === character.characterId
											)
												? "This character has already been saved!"
												: "Save this Character!"}
										</Button>
									)}
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container>
		</>
	);
};

export default SearchCharacters;
