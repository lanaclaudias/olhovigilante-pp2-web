import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Certifique-se de importar o arquivo CSS correspondente

function App() {
  return (
    <div>
      <header className="header">
        <img src="logo.jpg" alt="Logo da Empresa" className="logo" />
        <nav>
          <ul className="nav-list">
            <li><a href="#">Página Inicial</a></li>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
      </header>
      <a href="tela-Cadastro.html" className="login-button">Entrar/Cadastrar-se</a>
      <div className="content">
        <h1>Bem-vindo à nossa página inicial</h1>
        <div className="image-carousel">
          <img src="./imagem1.jpg" alt="Imagem 1"/>
          <img src="./imagem2.webp" alt="Imagem 2"/>
          <img src="./imagem3.jpg" alt="Imagem 3"/>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
