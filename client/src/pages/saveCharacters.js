// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { GET_ME } from '../utils/queries';
import{ REMOVE_CHARACTER } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeCharacterId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';

const SavedCharacter = () => {
  const [removeCharacter] = useMutation (REMOVE_CHARACTER)
  const {data} = useQuery (GET_ME)
  const userData = data?.me || {}
  console.log (data, userData)
  // const userDataLength = Object.keys(userData).length;

  const handleDeleteCharacters = async (characterId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    
    try {
      const {data} = await removeCharacter ({
        variables: {characterId: characterId}        
      })

      removeCharacterId(characterId);
    }catch (err) {
      console.error(err);
    }
  }; 

  return (
    <>
    <Jumbotron fluid className='text-light bg-dark'>
     <Container>
      <h1>Viewing saved characters!</h1>
      </Container> 
    </Jumbotron>
    <Container>
      <h2>
      {userData?.SavedCharater?.length
            ? `Viewing ${userData.savedCharater.length} saved ${userData.savedCharacter.length === 1 ? 'character' : 'characters'}:`
            : 'You have no saved character!'}
      </h2>
      <CardColumns>
      {userData?.savedCharacters?.map((character) => {
            return (
              <Card key={character.characterId} border='dark'>
                {character.image ? <Card.Img src={character.image} alt={`The cover for ${character.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                  <p className='small'>Characters: {character.series}</p>
                  <Card.Text>{character.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteCharacters(character.characterId)}>
                    Delete this Character!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedCharacter;
