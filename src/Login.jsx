import './index.css';
import Logo from './assets/logprovi.png';

function Login() {
  return (
    <div className="container">
      <img src={Logo} alt="Logo da Empresa" className="logo" />
      <h2 style={{ color: '#ffffff' }}>Login</h2>
      <form>
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Login;
