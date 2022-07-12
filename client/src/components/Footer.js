import React from "react";
import { Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
export default function Footer() {
	return (
		<footer className="footer fixed-bottom">
			<Flex backgroundColor={"black"} as="nav" p={4} justifyContent="space-between" alignItems="center">
				<Heading color={'white'} as="h1" size="md">Data provided by Marvel. © 2014 Marvel </Heading>
				<HStack color={'white'} fontSize="1.5xl" spacing={6}>
				<Link  a href="https://github.com/amhernandez1163" target="_blank" rel="noreferrer noopener" textDecoration={"underline"} >Amanda Hernandez</Link>
				<Link  a href="https://github.com/EvelynAguirreOrtiz" target="_blank" rel="noreferrer noopener" textDecoration={"underline"} >Evelyn Aguirre</Link>
				<Link  a href="https://github.com/Bluebear1701" target="_blank" rel="noreferrer noopener" textDecoration={"underline"} >Monica Solano</Link>
				<Link  a href="https://github.com/CDMurr" target="_blank" rel="noreferrer noopener" textDecoration={"underline"} >Cody Murray</Link>
				</HStack>
			</Flex>
		</footer>
	);
}


/* <a href="https://marvel.com" target="_blank" rel="noreferrer">
				Data provided by Marvel. © 2014 Marvel (this is the footer)
			</a>{" "} */
