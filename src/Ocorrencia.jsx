import React from "react";
import { useState } from "react";
import Mapa from "./assets/mapa.png";
import Header from "./components/Header/Header";
import axios from "axios";

const Ocorrencia = () => {
  const fields = [
    {
      label: "Tipo de Ocorrência",
      type: "text",
      handleChange: (e) => setTipoOcorrencia(e.target.value),
    }, // implementar select
    {
      label: "Descrição",
      type: "textarea",
      placeholder:
        "Descrição base e informações adicionais como presença policial, ação policial, motivação, quantidade de vítimas, etc.",
      handleChange: (e) => setDescricao(e.target.value),
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
    {
      label: "Data",
      type: "date",
      handleChange: (e) => setData(e.target.value),
    },
    {
      label: "Hora",
      type: "time",
      handleChange: (e) => setHora(e.target.value),
    },
    //{ label: 'Presença policial?', type: 'radio', values: ['Sim', 'Não'] },
    //{ label: 'Ação policial?', type: 'text' },
    //{ label: 'Motivação', type: 'textarea' },
    //{ label: 'Quantidade de vitimas', type: 'text' },
    { label: "Midia", type: "file", onChange: (e) => setMidia(e.target.value) }, // implementação apropriada para múltiplos arquivos pendente e necessita integrar com a API de Mídia já configurada com suas associações
    {
      label: "Geolocalização",
      type: "text",
      onChange: (e) => setGeolocalizacao(e.target.value),
    }, // aguardando a integração com a API do Google Maps
    {
      label: "ID do Usuário",
      type: "text",
      onChange: (e) => setUsuarioId(parseInt(e.target.value)),
    }, // campo temporário até a implementação do login de usuário
  ];

  const [showModal, setShowModal] = useState(false);
  const [tipoOcorrencia, setTipoOcorrencia] = useState();
  const [descricao, setDescricao] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [midia, setMidia] = useState();
  const [geolocalizacao, setGeolocalizacao] = useState();
  const [usuarioId, setUsuarioId] = useState();

  function salvar() {
    const ocorrenciaRequest = {
      tipoOcorrencia: tipoOcorrencia,
      descricao: descricao,
      cidade: cidade,
      bairro: bairro,
      dataHoraOcorrencia: data,
      hora: hora,
      midia: midia, // não funcionam no momento / undefined
      geolocalizacao: geolocalizacao, // não funcionam no momento / undefined
      usuarioId: usuarioId, // não funcionam no momento / undefined
    };
    console.log(ocorrenciaRequest);
    axios
      .post("http://localhost:8082/api/ocorrencia", ocorrenciaRequest)
      .then((r) => {
        alert("Ocorrência cadastrada com sucesso.");
      })
      .catch((e) => {
        alert("Falha ao cadastrar ocorrência.\n" + e.name + " - " + e.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    salvar();
    setShowModal(false);
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-white text-center">Faça uma Ocorrência!</h2>
        <div className="flex space-x-4 justify-between items-center">
          <div className="flex gap-10">
            <button className="bg-black text-white font-bold py-2 px-4 rounded">
              Minhas Ocorrências
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white font-bold py-2 px-4 rounded"
            >
              Nova Ocorrência
            </button>
          </div>
          <div className="flex space-x-4 justify-end pr-4">
            {" "}
            {/* Adicionando a classe pr-4 para margem direita */}
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar"
                className="border-2 border-blue-500 rounded-tl-none px-10 py-2 focus:outline-none focus:ring focus:border-blue-800"
              />
              <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                Buscar
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-10 items-start pt-10">
          <div>
            <img src={Mapa} />
          </div>

          <div className="container mx-auto mt-4 p-4 rounded border border-gray-300 w-1/2">
            {" "}
            {/* Definindo a largura para 50% (w-1/2) */}
            <p className="text-black font-semibold">
              Assalto Próximo à Estação de Jaboatão
            </p>
            <p className="text-gray-600">16/10/2023 20:40</p>
          </div>
        </div>
      </div>
      {/* MODAL */}

      {showModal ? (
        <>
          {/* Falta o elemento form com o botão de submit interno*/}
          <form className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onSubmit={ handleSubmit }
          >
            <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h1 className="text-black text-[24px] font-bold text-center pt-4">
                  NOVA OCORRÊNCIA
                </h1>
                <div className="relative p-6 flex-auto">
                  {fields.map(({ label, type, values, handleChange }) => (
                    <div key={label}>
                      <label className="block text-black font-bold">
                        {label}
                      </label>
                      {type === "textarea" ? (
                        <textarea
                          placeholder={label}
                          onChange={handleChange}
                          className="border rounded-[6px] p-3 w-full mb-4 text-black"
                        />
                      ) : type === "radio" ? (
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
                      ) : type === "file" ? (
                        <input
                          type="file"
                          onChange={handleChange}
                          className="border rounded-[6px] p-3 w-full mb-4 text-black"
                        />
                      ) : (
                        <input
                          type={type}
                          placeholder={label}
                          onChange={handleChange}
                          className="border rounded-[6px] p-3 w-full mb-4 text-black"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex gap-[20px] items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="font-bold px-[52px] py-[12px] rounded-lg mt-3 bg-red-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    FECHAR
                  </button>
                  <button
                    className="font-bold bg-blue-400 px-[52px] py-[12px] rounded-lg mt-3"
                    type="submit"
                    /*onClick={() => {
                      salvar();
                      setShowModal(false);
                    }}*/
                  >
                    SALVAR
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

export default Ocorrencia;
