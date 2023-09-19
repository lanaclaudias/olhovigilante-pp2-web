import React from "react";
import "./App.css";

function Login() {
  return (
    <div className="container">
      <a href="/">
        <img src="logo.jpg" alt="Olho Vigilante" className="logo" />
      </a>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Login;
