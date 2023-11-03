//import { Menu } from "semantic-ui-react";
import { Box, Link as ChakraLink, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Box bg="black" padding="0 20px">
        <Flex gap={"20"} alignItems={"center"}>
          <Image w={"40px"} src="logo.jpg"></Image>
          <ChakraLink
            fontWeight={"bold"}
            textDecor={"none"}
            color={"#FFF"}
            as={ReactRouterLink}
            to={"/"}
          >
            Página Inicial
          </ChakraLink>
          <Spacer />
          <ChakraLink
            fontWeight={"bold"}
            textDecor={"none"}
            color={"#FFF"}
            as={ReactRouterLink}
            to={"/login"}
          >
            Entrar/Cadastrar-se
          </ChakraLink>
        </Flex>
      </Box>
    </>
  );
}
