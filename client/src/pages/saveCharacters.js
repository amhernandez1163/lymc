import React from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { GET_ME } from "../utils/queries";
import { REMOVE_CHARACTER } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeCharacterId } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/client";

const SavedCharacter = () => {
    const [removeCharacter] = useMutation(REMOVE_CHARACTER);
    const { data } = useQuery(GET_ME);
    const userData = data?.me || {};
    console.log(data, userData);

    const handleDeleteCharacters = async (characterId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeCharacter({
                variables: { characterId: characterId },
            });

            removeCharacterId(characterId);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container
            minHeight={"container.lg"}
            maxWidth={"100%"}
            py={3}
            backgroundImage={
                "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avas_p_0189_ss13_copy.jpg"
            }
        >
            <VStack
                align="center"
                bg="white"
                p={6}
                spacing={6}
                border={"8px"}
                borderColor={"silver"}
                borderStyle={"ridge"}
            >
                <Heading as="h2" size="lg">
                    Viewing saved characters!
                </Heading>
                <Container align="center">
                    <h2>
                        {userData?.SavedCharacters?.length
                            ? `Viewing ${
                                  userData.savedCharacters.length
                              } saved ${
                                  userData.savedCharacters.length === 1
                                      ? "character"
                                      : "characters"
                              }:`
                            : "You have no saved characters!"}
                    </h2>
                    <CardGroup>
                        {userData?.savedCharacters?.map((character) => {
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
                                        <Card.Title>
                                            {character.name}
                                        </Card.Title>
                                        <p className="small">
                                            Characters: {character.series}
                                        </p>
                                        <Card.Text>
                                            {character.description}
                                        </Card.Text>
                                        <Button
                                            className="btn-block btn-danger"
                                            onClick={() =>
                                                handleDeleteCharacters(
                                                    character.characterId
                                                )
                                            }
                                        >
                                            Delete this Character!
                                        </Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </CardGroup>
                </Container>
            </VStack>
        </Container>
    );
};

export default SavedCharacter;
