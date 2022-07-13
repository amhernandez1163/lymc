import React, { useState } from "react";
import { fetchCharacters } from "../utils/utils";
import { Input, Flex, Button, VStack } from "@chakra-ui/react";

export default function SearchBar({ setter }) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (input === "") return;

        try {
            let characters = await fetchCharacters(input);

            setter(characters);
        } catch (err) {
            return console.error(err);
        }
    };

    return (
        <VStack as="form" spacing={2} align="center">
            <Input
                type="text"
                textAlign="center"
                border={"dashed"}
                borderColor={"blackAlpha.500"}
                borderRadius={"2xl"}
                borderWidth={"thick"}
                placeholder="Search here..."
                onChange={handleChange}
            />
            {/* <Flex textColor={'white'} backgroundColor={'red'} boxShadow={'lg'} borderRadius={'20%'} border={'2px'}> */}
            <Button onClick={handleClick} colorScheme="red">
                Click here to search
            </Button>
            {/* </Flex> */}
        </VStack>
    );
}
