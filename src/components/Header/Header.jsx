import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/mini-logo.png";

const navMenuItems = [
  {
    icon: "/icon-inicio.svg",
    text: "Início",
    link: "/",
  },
  {
    icon: "/icon-ocorrencias.svg",
    text: "Ocorrências",
    link: "/ocorrencia",
  },
  {
    icon: "/icon-comunidade.svg",
    text: "Comunidade",
    link: "/comunidade",
  },
  {
    icon: "/icon-megaphone2.svg",
    text: "Onde Denunciar",
    link: "/denunciar",
  },
];
const navUserBtns = [
  {
    icon: "/icon-usuario.svg",
    text: "Perfil",
    link: "/perfil",
  },
  {
    icon: "btn-entrar.svg",
    //text: "",
    link: "/login",
  },
  {
    icon: "btn-cadastrar.svg",
    // text: "",
    link: "/cadastro",
  },
];
const icons = {
  perfil: "/icon-usuario.svg",
  login: "/btn-entrar.svg",
  cadastro: "/btn-cadastrar.svg",
};

const Header = () => {
  const [activeUrl, setActiveUrl] = useState("");
  const [user, setUser] = useState({});
  const location = useLocation();

  // const isLoggedIn = (token) => {
  //   if (token && Object.keys(token).length > 0) return token.user;

  //   return {};
  // };

  useEffect(() => {
    setActiveUrl(location.pathname);
    //setUser({});
  }, [location]);

  return (
    <header className="bg-black text-white">
      <div className="container flex justify-between items-center flex-wrap">
        <Link to="/">
          <img src={logo} alt="" className="minilogo mt-1" />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="max-lg:hidden">
          <ul className="menu flex items-center gap-12">
            {navMenuItems.map((elem) => (
              <li key={elem.icon.slice(5, -4)}>
                <Link
                  to={elem.link}
                  className="flex font-sora text-white flex-col"
                >
                  <img
                    // src={elem.icon}
                    src={
                      activeUrl == elem.link
                        ? elem.icon.slice(0, -4) + "-active.svg"
                        : elem.icon
                    }
                    /* src={ icons.home.slice(0, -4) + "-active.svg"} */
                    alt=""
                    className="self-center w-8 h-8"
                  />
                  <p>{elem.text}</p>
                </Link>
              </li>
            ))}
            {/* Item Temporário enquanto não for implementado o login */}
            <li>
              <Link to={navUserBtns[0].link}>
                <img
                  src={
                    activeUrl == navUserBtns[0].link
                      ? navUserBtns[0].icon.slice(0, -4) + "-active.svg"
                      : navUserBtns[0].icon
                  }
                />
                <p>{navUserBtns[0].text}</p>
              </Link>
            </li>
          </ul>
        </nav>

        {/* MENU MOBILE */}
        <div className="lg:hidden">
          <button>Menu</button>
          <nav>
            <ul>
                <li><a href="">Item 1</a></li>
                <li><a href="">Item 2</a></li>
                <li><a href="">Item 3</a></li>
            </ul>
          </nav>
        </div>

        <div className="userButtons max-lg:hidden flex gap-6">
          {/* {console.log(user)} */}
          {navUserBtns.map((elem) => (
            <div key={elem.icon.slice(5, -4)} className="flexflex-col">
              {Object.keys(user).length == 0 && elem.text == "Perfil" ? (
                ""
              ) : (
                <Link to={elem.link} className="self-center ">
                  {/* Acrescentar highlights para quando estiver em hover */}
                  <img src={elem.icon} alt="" />
                  <p>{elem.text}</p>
                </Link>
              )}
            </div>
          ))}
          {/* <Link to="/perfil" className="flex flex-col">
          <img src={icons.perfil} alt="" className="self-center w-8 h-8" />
          <p>Perfil</p>
        </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
