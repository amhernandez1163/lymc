import MD5 from "crypto-js/md5";

const API_URL = process.env.REACT_APP_BASE_URL;

const getHash = (ts, secretKey, publicKey) => {
	return MD5(ts + secretKey + publicKey).toString();
};

export const searchMarvelCharacters = (query) => {
	let baseUrl = `${API_URL}/v1/public/characters`;
	let ts = Date.now().toString();
	let apiKey = process.env.REACT_APP_API_KEY;
	let privateKey = process.env.REACT_APP_PRIVATE_KEY;
	let hash = getHash(ts, privateKey, apiKey);

	// return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
	return fetch(
		`${baseUrl}?ts=${ts}&apiKey=${apiKey}&hash=${hash}&nameStartsWith=${query}`
	);
};
