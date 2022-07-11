import React, { useRef } from "react";
import { fetchHeroes } from "../utils/utils";
import { Input } from '@chakra-ui/react';


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
			<Input type="text" placeholder="Search here..." ref={input} />
			<button onClick={handleClick}>Search</button>
		</form>
	);
}
