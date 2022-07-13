import React, { useState } from "react";

import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";
import Card from "../components/Card";
// import About from "./About";


const IMAGE_SIZE = "portrait_fantastic";

export default function Home() {
	const [characters, setCharacters] = useState([]);

	let cards;

	if (characters) {
		cards = characters.map((character) => (
			<Card
				name={character.name}
				id={character.id}
				key={character.id}
				thumbnail={`${character.thumbnail.path}/${IMAGE_SIZE}.${character.thumbnail.extension}`}
			/>
		));
	}

	return (
		<Container minHeight={'container.lg'} maxWidth={'100%'} backgroundImage={'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avas_p_0189_ss13_copy.jpg'}>
			
		<VStack spacing={6} justify="center">
		
		
		<Container border={'8px'} borderColor={'silver'} borderStyle={'ridge'}  boxShadow='md' p='6' rounded='md' bg='white' backgroundImage={'https://gameranx.com/wp-content/uploads/2021/09/Marvel.jpg'} paddingRight={'10'}  minHeight={'400px'} maxWidth={'700px'} ></Container>
		

		<Flex border={'8px'} borderColor={'silver'} borderStyle={'ridge'}  boxShadow='md' p='6' rounded='md' bg='white' padding={'10px'} backgroundColor={'white'}>
		<SearchBar  setter={setCharacters} />
		</Flex>
		<Container border={'8px'} borderColor={'silver'} borderStyle={'ridge'}  boxShadow='md' p='6' rounded='md' bg='white'  backgroundColor={"white"} alignContent={"center"} width={"700px"} fontSize={'2xl'} fontWeight={'bold'} fontFamily={'fantasy'}>Make sure you're up-to-date on all the newest and most classic Marvel characters. As a way to equalize the playing field for people with different levels of Marvel knowledge, this application was created. It can be used by anyone, regardless of their level of fandom. Therefore, we invite you all to come talk Marvel with us. Login or sign up to save your favorite Marvel Characters	
		</Container>
		<Container border={'8px'} borderColor={'silver'} borderStyle={'ridge'} backgroundColor={"white"} width={"200px"}  >
		<Grid  >{cards ? cards : ""}</Grid>
		</Container>

		</VStack>
		</Container>
	);
}
