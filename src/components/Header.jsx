import { Box, Flex, Image, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Box bg="black">
        <Box maxWidth={"1200px"} padding="0 0px">
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
      </Box>
    </>
  );
};

export default Header;
