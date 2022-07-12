import React, { useRef } from "react";
import { fetchCharacters } from "../utils/utils";
// import { searchCharacters } from "../pages/searchCharacters";
import { Input } from "@chakra-ui/react";

export default function SearchBar({ setter }) {
	let input = useRef("");

	const handleClick = async (e) => {
		e.preventDefault();
		let value = input.current.value;
		if (value === "") return;

		try {
			let characters = await fetchCharacters(value);
			// let characters = await searchCharacters(value);

			setter(characters);
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
