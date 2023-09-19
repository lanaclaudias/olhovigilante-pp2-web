import React from "react";
import { Link } from "react-router-dom";
//import { Menu } from "semantic-ui-react";

export default function Navbar() {
  return (
    <div>
      <header className="header">
        <a href="/">
          <img src="logo.jpg" alt="Olho Vigilante" className="logo" />
        </a>
        <nav>
          <ul className="nav-list">
            <li>
              <a href="/">Página Inicial</a>
            </li>
            <li>
              <a href="/sobre">Sobre Nós</a>
            </li>
            <li>
              <a href="/contato">Contato</a>
            </li>
          </ul>
        </nav>
      </header>
      <a href="/login" className="login-button">
        Entrar/Cadastrar-se
      </a>
    </div>
  );
}
