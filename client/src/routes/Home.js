import React, { useState } from "react";

import {Container, Flex, VStack} from "@chakra-ui/react"

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
		<Container minHeight={'container.lg'} maxWidth={'100%'} backgroundImage={'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avas_p_0189_ss13_copy.jpg'}>
			
		<VStack spacing={6} justify="center">
		
		
		<Container backgroundImage={'https://gameranx.com/wp-content/uploads/2021/09/Marvel.jpg'} paddingRight={'10'} rounded={'20'} minHeight={'400px'} maxWidth={'700px'} ></Container>
		

		<Flex boxShadow='md' p='6' rounded='md' bg='white' padding={'10px'} backgroundColor={'white'}>
		<SearchBar  setter={setHeroes} />
		</Flex>
		<Container boxShadow='md' p='6' rounded='md' bg='white' paddingBottom={8} backgroundColor={"white"} alignContent={"center"} width={"500px"}>Make sure you're up-to-date on all the newest and most classic Marvel characters. As a way to equalize the playing field for people with different levels of Marvel knowledge, this application was created. It can be used by anyone, regardless of their level of fandom. Therefore, we invite you all to come talk Marvel with us. Login or sign up to save your favorite Marvel Characters	
		</Container>
		<Container  backgroundColor={"white"} width={"200px"}  >
		<Grid  backgroundColor={"white"} width={"400px"}>{cards ? cards : ""}</Grid>
		</Container>

		</VStack>
		</Container>
	);
}
