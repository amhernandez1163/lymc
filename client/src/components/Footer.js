import React from "react";
import { Flex, Heading, HStack, Link } from "@chakra-ui/react";
import Music from "../routes/Music";

export default function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <Flex
        p={2}
        backgroundColor={"black"}
        as="nav"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading color={"#ffffff8c"} as="h1" size="xs">
          Data provided by Marvel. © 2014 Marvel{" "}
        </Heading>
        <HStack color={"white"} fontSize={9} spacing={6}>
          <Link
            a
            href="https://github.com/amhernandez1163"
            target="_blank"
            rel="noreferrer noopener"
            textDecoration={"underline"}
          >
            Amanda Hernandez
          </Link>
          <Link
            a
            href="https://github.com/EvelynAguirreOrtiz"
            target="_blank"
            rel="noreferrer noopener"
            textDecoration={"underline"}
          >
            Evelyn Aguirre
          </Link>
          <Link
            a
            href="https://github.com/Bluebear1701"
            target="_blank"
            rel="noreferrer noopener"
            textDecoration={"underline"}
          >
            Monica Solano
          </Link>
          <Link
            a
            href="https://github.com/CDMurr"
            target="_blank"
            rel="noreferrer noopener"
            textDecoration={"underline"}
          >
            Cody Murray
          </Link>
          <Music />
        </HStack>
      </Flex>
    </footer>
  );
}
