import { Heading, Image } from "@chakra-ui/react";
import Header from "./Header";
// import "./index.css"; // Certifique-se de importar o arquivo CSS correspondente

function Home() {
  return (
    <>
      <Header />
      <Heading fontSize={34}>Bem-vindo à nossa página inicial</Heading>
      <Image maxW={"100%"} src="./imagem1.jpg" />
    </>
  );
}

export default Home;
