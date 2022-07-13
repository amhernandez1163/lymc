import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacter } from "../utils/utils";
import {
  Container,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  VStack,
} from "@chakra-ui/react";

export default function CharacterDetails() {
  const { id } = useParams();
  console.log("id from url", id);
  const [character, setCharacter] = useState();

  const getData = async () => {
    if (id) {
      fetchCharacter(id)
        .then(async (data) => {
          console.log("api data response ===", data);
          await setCharacter(data.data.results[0]);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      minHeight={"container.lg"}
      maxWidth={"100%"}
      py={3}
      backgroundImage={
        "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avas_p_0189_ss13_copy.jpg"
      }
    >
      {character ? (
        <Stack
          spacing={6}
          align="center"
          direction={{ base: "column", lg: "row" }}
        >
          <Image
            border={"8px"}
            borderColor={"silver"}
            borderStyle={"ridge"}
            maxWidth={"600px"}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt="Marvel Character"
          />
          <VStack
            border={"8px"}
            borderColor={"silver"}
            borderStyle={"ridge"}
            backgroundColor={"white"}
            p={6}
            spacing={3}
            align="center"
          >
            <Heading size={"lg"}>{character.name}</Heading>
            {character.description ? (
              <>
                <h4>Description</h4>
                <p>{character.description}</p>
              </>
            ) : null}
            <VStack spacing={2} align="center">
              <Heading as={"h3"} size="md">
                Series
              </Heading>
              <List align="center">
                {character.series.items.map((s) => (
                  <ListItem key={Math.random() * 1000}>{s.name}</ListItem>
                ))}
              </List>
            </VStack>
          </VStack>
        </Stack>
      ) : (
        <></>
      )}
    </Container>
  );
}
