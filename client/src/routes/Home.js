import React, { useState } from "react";

import {Container, Heading, VStack} from "@chakra-ui/react"

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
		<Container>
		<VStack spacing={6} justify="center">
		<Heading as="h1" size="xl" color="red">Discover Marvel Heroes</Heading>
		<SearchBar setter={setHeroes} />
		<Grid>{cards ? cards : ""}</Grid>
		</VStack>
	</Container>
	);
}
