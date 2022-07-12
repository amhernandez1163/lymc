const MD5 = require("crypto-js/md5");
const axios = require("axios").default;
const express = require("express");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.post("/api/getCharacters", async (req, res) => {
	console.log("hit");
	// get api from docs
	let baseUrl = `https://gateway.marvel.com/v1/public/characters`;
	const getHash = (ts, secretKey, publicKey) => {
		return MD5(ts + secretKey + publicKey).toString();
	};
	let ts = Date.now().toString();
	let apiKey = process.env.REACT_APP_API_KEY;
	let privateKey = process.env.REACT_APP_PRIVATE_KEY;

	let hash = getHash(ts, privateKey, apiKey);
	console.log(req.body);
	let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}&nameStartsWith=${req.body.name}`;
	// move to search
	try {
		let response = await axios.get(url);

		// let data = await response.json();
		console.log(response);

		return res.json(response);
	} catch (err) {
		console.error(err);
		return;
	}
});

app.get("/api/getCharacter", async () => {
	let baseUrl = `${API_URL}/v1/public/characters/${id}`;

	let ts = Date.now().toString();
	let apiKey = process.env.REACT_APP_API_KEY;
	let privateKey = process.env.REACT_APP_PRIVATE_KEY;

	let hash = getHash(ts, privateKey, apiKey);

	let url = `${baseUrl}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

	try {
		let response = await fetch(url);
		// let data = await response.json();
		// console.log(data);
		return res.json(response);
	} catch (err) {
		console.error(err);
		return;
	}
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once("open", () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
