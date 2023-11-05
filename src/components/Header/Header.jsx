import logo from "/mini-logo.png";

const Header = () => {
  return (
    <header className="bg-black">
      <div className="container flex justify-between items-center flex-wrap">
        <a href="/">
          <img src={logo} alt="" className="mt-1" />
        </a>
        <nav>
          <ul className="flex items-center gap-12">
            <li>
              <a href="/" className="flex flex-col">
                <img src="icon-inicio.svg" alt="" className="self-center" />
                <p>Início</p>
              </a>
            </li>
            <li>
              <a href="/ocorrencias" className="flex flex-col">
                <img
                  src="icon-ocorrencias.svg"
                  alt=""
                  className="self-center"
                />
                <p>Ocorrências</p>
              </a>
            </li>
            <li>
              <a href="comunidade" className="flex flex-col">
                <img src="icon-comunidade.svg" alt="" className="self-center" />
                <p>Comunidade</p>
              </a>
            </li>
            <li>
              <a href="/denunciar" className="flex flex-col">
                <img src="megaphone.svg" alt="" className="self-center w-8" />
                <p>Onde Denunciar</p>
              </a>
            </li>
          </ul>
        </nav>
        <a href="/perfil" className="flex flex-col">
          <img src="icon-usuario.svg" alt="" className="self-center w-8" />
          <p>Perfil</p>
        </a>
      </div>
    </header>
  );
};

export default Header;
