import React, { useRef } from "react";
import { fetchHeroes } from "../utils/utils";
import { Input, Flex  } from '@chakra-ui/react';


export default function SearchBar({ setter }) {
	let input = useRef("");

	const handleClick = async (e) => {
		e.preventDefault();
		let value = input.current.value;
		if (value === "") return;

		try {
			let heroes = await fetchHeroes(value);
			setter(heroes);
		} catch (err) {
			return console.error(err);
		}
	};

	return (
		<form>
			<Input type="text" border={'dashed'} borderColor={'blackAlpha.500'} borderRadius={'2xl'} borderWidth={'thick'} placeholder="Search here..." ref={input} />
			<Flex textColor={'white'} backgroundColor={'red'} boxShadow={'lg'} borderRadius={'20%'} border={'2px'}>
			<button onClick={handleClick}>Click here to search</button>
			</Flex>
		</form>
	);
}
