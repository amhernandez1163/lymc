import React from "react";
import { Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
export default function Footer() {
	return (
		<footer className="footer fixed-bottom">
			<Flex backgroundColor={"gray"} as="nav" p={6} justifyContent="space-between" alignItems="center">
				<Heading as="h1" size="md">Data provided by Marvel. © 2014 Marvel </Heading>
				<HStack spacing={6}>
				<Link  as={RouterLink} to="https://github.com/CDMurr">Amanda Hernandez</Link>
				<Link  as={RouterLink} to="https://github.com/CDMurr">Evelyn Aguirre</Link>
				<Link  as={RouterLink} to="https://github.com/CDMurr">Monica Solano</Link>
				<Link  as={RouterLink} to="https://github.com/CDMurr">Cody Murray</Link>
				</HStack>
			</Flex>
		</footer>
	);
}


/* <a href="https://marvel.com" target="_blank" rel="noreferrer">
				Data provided by Marvel. © 2014 Marvel (this is the footer)
			</a>{" "} */
