import React from 'react';
import './App.css'

function App() {
  return (
    <div className="container">
      <img src="./logo.jpg" alt="Logo da Empresa" className="logo" />
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );

}

export default App;
