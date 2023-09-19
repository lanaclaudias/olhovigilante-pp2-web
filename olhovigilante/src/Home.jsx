import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Certifique-se de importar o arquivo CSS correspondente
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Bem-vindo à nossa página inicial</h1>
        <div className="image-carousel">
          <img src="./imagem1.jpg" alt="Imagem 1" />
          <img src="./imagem2.webp" alt="Imagem 2" />
          <img src="./imagem3.jpg" alt="Imagem 3" />
        </div>
      </div>
    </div>
  );
}

export default Home;
