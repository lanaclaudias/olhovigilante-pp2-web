import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = () => {
    if (email !== '' && senha !== '') {

      let authenticationRequest = {
          email: email,
          senha: senha,
      }

      axios.post("http://localhost:8080/api/login", authenticationRequest)
      .then((response) => {
          // registerSuccessfulLoginForJwt(response.data.token, response.data.expiration);
          navigate("/");
      })
      .catch((error) => {
        console.log(error);
          // notifyError('Usuário não encontrado');
      })
  }
  }

  return (
    <>
      <Header />
      <div className="container flex flex-wrap mt-20 items-center">
        <div className="flex">
          <div
            className={`bg-[url(/Polygon.png)] bg-contain bg-no-repeat w-[600px] h-[600px] flex items-center justify-center text-center relative mb-[11px]`}
          >
            <div className="max-w-[100%] p-5 bg-white/70 rounded-lg text-center">
              <h1 className="text-black text-6xl mt-10 font-serif{ExtraBold} not-italic">
                Olho vigilante
              </h1>
              <p className="text-black text-lg mt-6">
                Aqui, você pode compartilhar informações, conhecer seus
                vizinhos, sua cidade, e ajudar a tornar sua comunidade mais
                segura. Junte-se a nós !!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <form className="border-2 rounded-lg bg-white pl-6 pr-6 pt-5 w-96 shadow py-8">
            <h2 className="text-black text-center mb-[50px] font-semibold text-[36px]">
              Login
            </h2>
            <label htmlFor="" className="block text-black font-bold">
              email
            </label>
            <input
              id={""}
              type={"email"}
              className="border rounded-6 p-3 w-full mb-4 text-black"
            />
            <label htmlFor="" className="block text-black font-bold">
              Senha
            </label>
            <input
              id={""}
              type={"senha"}
              className="border rounded-6 p-3 w-full mb-4 text-black"
            />
            <button className="font-bold bg-blue-400 px-20 py-4 rounded-lg mt-3 hover-bg-red-600">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
