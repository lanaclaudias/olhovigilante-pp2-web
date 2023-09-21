import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Container maxWidth={"100vw"}>
          <App />
        </Container>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
