import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-black">
      <div className="container mx-auto flex justify-between content-center items-center flex-wrap">
        <a href="">
          <img src={logo} alt="" />
        </a>
        <nav>
          <ul className="flex gap-12">
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="">Entrar</a>
            </li>
            <li>
              <a href="">Cadastrar</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
