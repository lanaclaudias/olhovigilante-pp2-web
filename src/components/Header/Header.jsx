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
              <a href="">INICIO</a>
            </li>
            <li>
              <a href="OCORRENCIAS">OCORRENCIAS</a>
            </li>
            <li>
              <a href="ARTIGOS">ARTIGOS</a>
            </li>
            <li>
              <a href="ONDE DENUNCIAR">ONDE DENUNCIAR</a>
            </li>
            <li>
              <a href="PERFIL">PERFIL</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
