import MD5 from "crypto-js/md5";
import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

const getHash = (ts, privateKey, apiKey) => {
	return MD5(ts + privateKey + apiKey).toString();
};

const fetchCharacters = async (value) => {
	// get api from docs
	console.log(value);
	// move to search
	try {
		// fetch("/api/getCharacters", {
		// 	method: "POST",
		// 	// mode: "cors",
		// 	body: JSON.stringify( name: value ),})
		// axios
		// 	.post(url, data, {
		// 		headers: {
		// 			Accept: "application/json",
		// 			"Content-Type": "application/json;charset=UTF-8",
		// 		},
		// 	})
		// 	.then(({ data }) => {
		// 		console.log(data);
		// 	});
	} catch (err) {
		console.error(err);
		return;
	}
};

const fetchCharacter = async (id) => {
	// get api from docs
	let baseUrl = `${API_URL}/v1/public/characters/${id}`;

	let ts = Date.now().toString();
	let apiKey = process.env.REACT_APP_API_KEY;
	let privateKey = process.env.REACT_APP_PRIVATE_KEY;

	let hash = getHash(ts, privateKey, apiKey);

	let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

	try {
		let response = await fetch(url);
		let data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		console.error(err);
		return;
	}
};

export { fetchCharacters, fetchCharacter };
