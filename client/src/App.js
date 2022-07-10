import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./App.css";

// import / from "./components/SearchBar";
import Navbar from "./components/Navbar";
import HeroDetails from "./routes/HeroDetails";
// import saveCharacters from "./pages/saveCharacters";
// import searchCharacters from "./pages/searchCharacters";

import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";

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
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/saved" element={<saveCharacters />} />
          <Route path={"/:id"} element={<HeroDetails />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
