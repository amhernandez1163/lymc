import React, { useState } from "react";

import {Container, Flex, Heading, VStack} from "@chakra-ui/react"

// import Container from "../components/Container";
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";
import Card from "../components/Card";

const IMAGE_SIZE = "portrait_fantastic";

export default function Home() {
	const [heroes, setHeroes] = useState([]);

	let cards;

	if (heroes) {
		cards = heroes.map((hero) => (
			<Card
				name={hero.name}
				id={hero.id}
				key={hero.id}
				thumbnail={`${hero.thumbnail.path}/${IMAGE_SIZE}.${hero.thumbnail.extension}`}
			/>
		));
	}

	return (
		<Container   maxW='100%' backgroundImage={'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avas_p_0189_ss13_copy.jpg'}>
		<VStack spacing={6} justify="center">
		<Flex backgroundColor={'white'}>
		<Heading as="h1" size="xl" color="black">Discover Marvel Heroes</Heading>
		</Flex>
		<Flex padding={'10px'} backgroundColor={'grey'}>
		<SearchBar setter={setHeroes} />
		</Flex>
		<Flex backgroundColor={"white"} width={"200px"}>Login or sign up to save your favorite Marvel Characters	
		</Flex>
		<Flex backgroundImage={"white"} width={"200px"}>
		<Grid>{cards ? cards : ""}</Grid>
		</Flex>
		</VStack>
		</Container>
	);
}
