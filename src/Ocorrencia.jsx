import { useState, useEffect } from "react";
import Mapa from "./assets/mapa.png";
import Header from "./components/Header/Header";
import axios from "axios";

const Ocorrencia = () => {
  /*useEffect((props) => {
    axios
    .get("http://localhost:8082/api/usuario")
    .then(
      (res) => {
        setOcorrenciasLista = res.data;
        console.log(ocorrenciasLista)
      }
    )
  });*/

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
    {
      label: "Midia",
      type: "file",
      handleChange: (e) => setMidia(e.target.value),
    }, // implementação apropriada para múltiplos arquivos pendente e necessita integrar com a API de Mídia já configurada com suas associações
    {
      label: "Geolocalização",
      type: "text",
      handleChange: (e) => setGeolocalizacao(e.target.value),
    }, // aguardando a integração com a API do Google Maps
    {
      label:
        "ID do Usuário (campo temporário pela falta de implementação de login)",
      type: "text",
      handleChange: (e) => setUsuarioId(parseInt(e.target.value)),
    }, // campo temporário até a implementação do login de usuário
  ];

  const [showModal, setShowModal] = useState(false);
  const [showModalOcorrencia, setShowModalOcorrencia] = useState(false);
  const [tipoOcorrencia, setTipoOcorrencia] = useState();
  const [descricao, setDescricao] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [midia, setMidia] = useState();
  const [geolocalizacao, setGeolocalizacao] = useState("");
  const [usuarioId, setUsuarioId] = useState();

  function salvar() {
    const ocorrenciaRequest = {
      tipoOcorrencia: tipoOcorrencia,
      descricao: descricao,
      cidade: cidade,
      bairro: bairro,
      dataHoraOcorrencia: data,
      hora: hora,
      midia: midia,
      geolocalizacao: geolocalizacao,
      usuarioId: usuarioId,
    };
    //console.log(JSON.stringify(ocorrenciaRequest));
    axios
      .post("http://localhost:8082/api/ocorrencia", ocorrenciaRequest)
      .then((r) => {
        alert("Ocorrência cadastrada com sucesso.");
      })
      .catch((e) => {
        alert("Falha ao cadastrar ocorrência.\n" + e.name + " - " + e.message);
      });
  }

  const [ocorrencias, setOcorrencias] = useState([]);

  const listaOcorrencias = () => {
    axios
      .get("http://localhost:8082/api/ocorrencia")
      .then((response) => {
        setOcorrencias(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (ocorrencias !== null) {
      listaOcorrencias();
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    salvar();
    setShowModal(false);
  }

  const [ocorrenciaUnica, setOcorrenciaUnica] = useState();

  const handleClickOcorrencia = (id) => {
    axios
      .get(`http://localhost:8082/api/ocorrencia/${id}`)
      .then((response) => setOcorrenciaUnica(response.data))
      .catch((error) => console.log(error));
    setShowModalOcorrencia(true);
  };

  return (
    <>
      <Header />
      <div className="container ">
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

        <div className="flex pb-[1000px] relative justify-between gap-10 items-start pt-10">
          <div className="sticky top-0">
            <img src={Mapa} />
          </div>
          <div className="flex-1 hover:cursor-pointer">
            {ocorrencias.map(
              ({
                tipoOcorrencia,
                id,
                dataHoraOcorrencia,
                geolocalizacao,
                bairro,
                cidade,
              }) => {
                return (
                  <div
                    onClick={() => handleClickOcorrencia(id)}
                    key={id}
                    className="mt-4 p-4 rounded border border-gray-300 flex flex-col"
                  >
                    <p className="font-semibold">{tipoOcorrencia}</p>
                    <p className="text-gray-600">{dataHoraOcorrencia}</p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      {/* MODAL */}

      {showModal ? (
        <>
          {/* Falta o elemento form com o botão de submit interno*/}
          <form
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onSubmit={handleSubmit}
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

      {/* MODAL DETALHES OCORRENCIA*/}

      {showModalOcorrencia && ocorrenciaUnica ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none fixed min-w-[550px] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <h1 className="text-black text-[24px] font-bold text-center pt-4">
                DETALHES DA OCORRÊNCIA
              </h1>
              <div className="relative p-6 flex-auto">
                <h2 className="font-bold text-[24px]">
                  Tipo de ocorrência: {ocorrenciaUnica.tipoOcorrencia}
                </h2>
                <div className="pt-[12px] flex flex-col gap-2">
                  <p>Descrição: {ocorrenciaUnica.descricao}</p>
                  <div>
                    <p>Cidade: {ocorrenciaUnica.cidade}</p>
                    <p>Bairro: {ocorrenciaUnica.bairro}</p>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex gap-[20px] items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="font-bold px-[52px] py-[12px] rounded-lg mt-3 bg-red-600"
                  type="button"
                  onClick={() => setShowModalOcorrencia(false)}
                >
                  FECHAR
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Ocorrencia;
