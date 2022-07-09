import { searchMarvelAPI } from "../utils/marvelAPI";

const SearchCharacters = () => {
	const [searchedCharacters, setSearchedCharacters] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	const [savedCharacterIds, setSavedCharacterIds] = useState(
		getSavedCharacterIds()
	);

	useEffect(() => {
		return () => saveCharacterIds(savedCharacterIds);
	});

	// create method to search for characters and set state on form submit
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await searchMarvelCharacters(searchInput);

			if (!response.ok) {
				throw new Error("something went wrong!");
			}

			const { items } = await response.json();

			const characterData = items.map((character) => ({
				characterId: character.id,
				// authors: character.volumeInfo.authors || ["No author to display"],
				// title: character.volumeInfo.title,
				description: character.volumeInfo.description,
				// image: character.volumeInfo.imageLinks?.thumbnail || "",
			}));

			setSearchedCharacters(characterData);
			setSearchInput("");
		} catch (err) {
			console.error(err);
		}
	};

	// create function to handle saving a character to our database
	// const handleSaveCharacter = async (characterId) => {
	// 	// find the character in `searchedCharacters` state by the matching id
	// 	const characterToSave = searchedCharacters.find(
	// 		(character) => character.characterId === characterId
	// 	);

	// 	// get token
	// 	const token = Auth.loggedIn() ? Auth.getToken() : null;

	// 	if (!token) {
	// 		return false;
	// 	}

	// 	try {
	// 		const response = await saveCharacter(characterToSave, token);

	// 		if (!response.ok) {
	// 			throw new Error("something went wrong!");
	// 		}

	// 		// if character successfully saves to user's account, save character id to state
	// 		setSavedCharacterIds([...savedCharacterIds, characterToSave.characterId]);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	return (
		<>
			<Jumbotron fluid className="text-light bg-dark">
				<Container>
					<h1>Search for Marvel Characters!</h1>
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
						: "this can say anything we want as an introduction or instructions"}
				</h2>
				{/* <CardColumns>
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
												(savedCharacterId) => savedCharacterId === character.characterId
											)}
											className="btn-block btn-info"
											onClick={() => handleSaveCharacter(character.characterId)}
										>
											{savedCharacterIds?.some(
												(savedCharacterId) => savedCharacterId === character.characterId
											)
												? "This character has already been saved!"
												: "Save this Character!"}
										</Button>
									)}
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns> */}
			</Container>
		</>
	);
};

export default SearchCharacters;
