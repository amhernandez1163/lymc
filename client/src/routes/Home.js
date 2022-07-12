import React, { useState } from "react";

import { Container, Flex, Heading, VStack } from "@chakra-ui/react";

// import Container from "../components/Container";
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
		<Container
			className="container"
			maxW="100%"
			backgroundImage={
				"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avas_p_0189_ss13_copy.jpg"
			}
		>
			<VStack spacing={6} justify="center">
				<Flex backgroundColor={"white"}>
					<Heading as="h1" size="xl" color="black">
						Discover Marvel Characters
					</Heading>
				</Flex>
				<Flex padding={"10px"} backgroundColor={"grey"}>
					<SearchBar setter={setCharacters} />
				</Flex>
				<Flex backgroundColor={"white"} width={"200px"} height={"300px"}>
					Login or sign up to save your favorite Marvel Characters
				</Flex>
				<Grid className>{cards ? cards : ""}</Grid>
			</VStack>
		</Container>
	);
}
