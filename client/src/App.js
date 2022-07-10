import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./App.css";

import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import HeroDetails from "./routes/HeroDetails";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// function App() {
// 	return (
// 		<ApolloProvider client={client}>
// 			<Router>
// 				<>
// 					<Navbar />
// 					<Routes>
// 						{/* <Route exact path="/" component={SearchCharacters} /> */}
// 						{/* <Route exact path="/saved" component={SavedCharacters} /> */}
// 						<Route render={() => <h1 className="display-2">Wrong page!</h1>} />
// 					</Routes>
// 				</>
// 			</Router>
// 			<Footer />
// 		</ApolloProvider>
// 	);
// }

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
				<LoginForm />
				<SignupForm />
				<Routes>					
					<Route path={"/"} element={<Home />} />
					<Route path={"/:id"} element={<HeroDetails />} />
				</Routes>
				<Footer />
			</Router>
		</ApolloProvider>
	);
}

export default App;
