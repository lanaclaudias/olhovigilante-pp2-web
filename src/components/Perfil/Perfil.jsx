import Header from "../Header/Header";
import Abas from "./Abas";
import fotoPerfil from "/foto-perfil.png";
import banner from "/banner.png";
import engrenagem from "/engrenagem.svg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Perfil = () => {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState();
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();
  const [senha, setSenha] = useState();

  // Usuário setado manualmente enquanto o login não estiver implementado
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(10);
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/usuario/${userId}`)
      .then((res) => {
        //console.log(res.data);
        setUser(res.data);
        setNome(res.data.nome)
        setBairro(res.data.bairro);
        setCidade(res.data.cidade);
        setEmail(res.data.email);
        setCpf(res.data.cpf);
        setSenha(res.data.senha);
        //return res.data;
      })
      .catch((err) => {
        // corrigir tipo de return de acordo o
        setUser(null);
        //return null;
      });
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  const fields = [
    {
      label: "Nome",
      type: "text",
      handleChange: (e) => setNome(e.target.value),
    },
    {
      label: "Cidade",
      type: "text",
      handleChange: (e) => setCidade(e.target.value),
    },
    {
      label: "Bairro",
      type: "text",
      handleChange: (e) => setBairro(e.target.value),
    },
    /* {
      label: "CEP",
      type: "text",
      placeholder: "00.000-000",
      maxLength: 8,
      handleChange: (e) => setCep(e.target.value),
    } */,
    {
      label: "Email",
      type: "email",
      handleChange: (e) => setEmail(e.target.value),
    },
    {
      label: "CPF",
      type: "text",
      handleChange: (e) => setCpf(e.target.value),
      maxLength: 11
    },
    {
      label: "Redefinir senha",
      type: "password",
      handleChange: (e) => setSenha(e.target.value),
    },
  ];

  const handleSubmit = (e) => {
    //e.preventDefault();
    const usuarioRequest = {
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha,
      bairro: bairro,
      cidade: cidade,
    };
    
    axios
      .put(`http://localhost:8082/api/usuario/${userId}`, usuarioRequest)
      .then((res) => {
        console.log(res.status);
        setShowModal(false);
        //setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <div className="container relative">
        <div>
          <img src={banner} alt="" />
        </div>
        <button
          onClick={handleClick}
          className="absolute text-white top-10 right-0 flex rounded-l-lg font-semibold text-[16px] gap-2 px-[22px] py-[8px] bg-black"
        >
          Editar perfil <img src={engrenagem} alt="" />
        </button>
        <div className="flex items-center flex-col">
          <div className="top-[100px] absolute">
            <img src={fotoPerfil} alt="" />
          </div>
          <div className="mt-[94px]">
            <h2 className="text-center text-[18px] text-black font-bold">
              {user.nome}
            </h2>
            <p className="text-center text-[16px] text-gray-400">
              {user.cidade}
            </p>
            <button className="py-[12px] mt-[20px] border-black px-[84px] text-black border rounded font-bold text-[16px]">
              Seguir
            </button>
          </div>
        </div>
        <Abas />
      </div>

      {/* MODAL EDITAR PERFIL */}

      {showModal ? (
        <>
          <form
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onSubmit={handleSubmit}
          >
            <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h1 className="text-black text-[24px] font-bold text-center pt-4">
                  Editar dados
                </h1>
                <div className="relative p-6 flex-auto">
                  {fields.map(({ label, type, values, handleChange, maxLength }) => (
                    <div key={label}>
                      <label className="block text-black font-bold">
                        {label}
                      </label>
                      {type === "radio" ? (
                        <div className="flex">
                          {values.map((value, index) => (
                            <div key={index} className="mr-4">
                              <input
                                type={type}
                                value={value}
                                name={label}
                                onChange={handleChange}
                                className="mr-1"
                              />
                              <label htmlFor={value} className="text-black">
                                {value}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <input
                          type={type}
                          placeholder={label}
                          onChange={handleChange}
                          maxLength={maxLength}
                          className="border rounded-[6px] p-3 w-full mb-4 text-black"
                        />
                      )}
                    </div>
                  ))}
                  <div>
                    <input
                      className="inline-block mr-2"
                      id="ocorrencias"
                      type="checkbox"
                    />
                    <label htmlFor="ocorrencias" className="text-black">
                      Quero receber alertas de ocorrências por email
                    </label>
                  </div>
                  <div>
                    <input
                      className="inline-block mr-2"
                      id="artigos"
                      type="checkbox"
                    />
                    <label htmlFor="artigos" className="text-black">
                      Quero receber alertas de artigos novos por email
                    </label>
                  </div>
                  <div>
                    <input
                      className="inline-block mr-2"
                      id="geolocalizacao"
                      type="checkbox"
                    />
                    <label htmlFor="geolocalizacao" className="text-black">
                      Eu autorizo o uso de geolocalização
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex gap-[20px] items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white font-bold px-[52px] py-[12px] rounded-lg mt-3 bg-red-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    FECHAR
                  </button>
                  <button
                    className="text-white font-bold bg-blue-400 px-[52px] py-[12px] rounded-lg mt-3"
                    type="submit"
                    /*onClick={() => {
                      salvar();
                      setShowModal(false);
                    }}*/
                  >
                    ATUALIZAR
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Perfil;
