import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";

import "./App.css";

import Navbar from "./components/Navbar";
import CharacterDetails from "./routes/CharacterDetails";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import SavedCharacter from "./pages/saveCharacters";

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

function App() {
    return (
        <ChakraProvider>
            <ApolloProvider client={client}>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/saved" element={<SavedCharacter />} />
                        <Route path={"/:id"} element={<CharacterDetails />} />
                    </Routes>
                    <Footer />
                </Router>
            </ApolloProvider>
        </ChakraProvider>
    );
}

export default App;
