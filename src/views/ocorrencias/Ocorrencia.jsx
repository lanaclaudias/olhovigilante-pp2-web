import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Header from "../Header";
//import categorias from "./categorias.json";
import axios from "axios";
import {
  isUserLoggedIn,
  getUserId,
  USERID_SESSION_ATTRIBUTE_NAME,
} from "../../util/AuthenticationService";

import centerMarkerIcon from "/centermarker.png";
import dangerMarkerIcon from "/danger-icon.png";
import { notifyError, notifySuccess } from "../../util/Util";
import FileUploader from "../../util/FileUploader";
import DropZone from "../../util/DropZone";
import { Footer } from "../Footer";
import VoteOcorrencia from "./VoteOcorrencia";
import DeletarOcorrencia from "./DeletarOcorrencia";
/* import NovaOcorrenciaForm from "./NovaOcorrenciaForm"; */
import OcorrenciasMap from "./OcorrenciasMap";
import NovaOcorrenciaMap from "./NovaOcorrenciaMap";

import * as TestData from "../../util/TestData";
import { useNavigate } from "react-router-dom";
import { TipoOcorrenciaSelect } from "./TipoOcorrenciaSelect";
import NovaOcorrenciaForm from "./NovaOcorrenciaForm";

const Ocorrencia = () => {
  // Acrescentar value: {state} ao array de fields para os inputs
  // e incluir value como atributo durante a iteração para o render condicional?
  const [reportMarker, setReportMarker] = useState(null);
  const fields = [
    {
      label: "Tipo de Ocorrência",
      type: "select",
      handleChange: (e) => setCategoriaId(e.target.value),
    },
    {
      label: "Descrição",
      type: "textarea",
      placeholder:
        "Descrição base e informações adicionais como presença policial, ação policial, motivação, quantidade de vítimas, etc.",
      handleChange: (e) => setDescricao(e.target.value),
    },
    {
      label: "Data",
      type: "date",
      //pattern: "\d{1,2}/\d{1,2}/\d{4}",
      handleChange: (e) => setData(e.target.value),
    },
    {
      label: "Hora",
      type: "time",
      handleChange: (e) => setHora(e.target.value),
    },
    {
      label: "Mídia",
      type: "file",
      handleChange: (e) => {
        setMidia(e.target.value);
      },
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showModalOcorrencia, setShowModalOcorrencia] = useState(false);
  const [tipoOcorrenciaLista, setTipoOcorrenciaLista] = useState([]);
  //const [tipoOcorrencia, setTipoOcorrencia] = useState();
  const [descricao, setDescricao] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [midia, setMidia] = useState();
  const [geolocalizacao, setGeolocalizacao] = useState(); //useState("");
  const [usuarioId, setUsuarioId] = useState(
    parseInt(localStorage.getItem(USERID_SESSION_ATTRIBUTE_NAME))
  );
  const [categoriaId, setCategoriaId] = useState();
  const [ocorrencias, setOcorrencias] = useState([]);
  const [midiasArr, setMidiasArr] = useState([]);

  const [ocorrenciasOriginais, setOcorrenciasOriginais] = useState([]);
  const [bairroSelecionado, setBairroSelecionado] = useState("Selecione");

  const getCategoriasOcorrencias = React.useCallback(() => {
    axios
      .get("/api/categoriaocorrencia")
      .then((res) => {
        setTipoOcorrenciaLista(res.data);
        /* if(res.data.length == 0) { axios.post("/api/categoriaocorrencia/populate")
        .then((r) => setTipoOcorrenciaLista(r.data)); } // precisa fazer populate retornar um array com todas as categorias */
      })
      .catch((err) => {
        setTipoOcorrenciaLista([{ nome: "Lista Vazia" }]);
        notifyError("Nenhuma categoria de ocorrência encontrada.");
      });
  }, [tipoOcorrenciaLista]);

  const getUsuarios = React.useCallback(() => {
    axios.get("/api/ocorrencia").then((res) => {
      // Usuários
      TestData.usuariosIniciais.map((elem) => {
        const usuarioRequestInicial = elem;
        //console.log(usuarioRequestInicial);
        axios
          .post("/api/usuario", usuarioRequestInicial)
          .then((response) => {
            notifySuccess("Usuários iniciais carregados com sucesso.");
          })
          .catch((err) => {
            notifyError("Falha ao carregar os usuários iniciais.", err.message);
            //navigate("/");
          });
      });
    });
  });

  const getOcorrencias = React.useCallback(() => {
    axios
      .get("/api/ocorrencia")
      .then((res) => {
        setOcorrencias(res.data);
        setOcorrenciasOriginais(res.data);
        //console.log(ocorrencias);

        // Popular tabelas de usuário e ocorrência
        /* if (res.data.length == 0) {
          // Ocorrências
          TestData.ocorrenciasIniciais.map((elem) => {
            const ocorrenciaRequestInicial = elem;
            //console.log(ocorrenciaRequestInicial);
            axios
              .post(
                "/api/ocorrencia",
                ocorrenciaRequestInicial
              )
              .then((response) => {
                // midiasArr.map(({ fileUrl }) => {
                //   const midiaRequest = {
                //     ocorrenciaId: response.data.id,
                //     midiaUrl: fileUrl,
                //   };
                //   axios
                //     .post("/api/midia", midiaRequest)
                //     .then((res) => {
                //       //console.log("Midia cadastrada: ", res.data)
                //     })
                //     .catch((err) => notifyError("Falha no upload dos arquivos."));
                // });
                setOcorrencias([...ocorrencias, response.data]);
                notifySuccess("Ocorrencia iniciais carregadas com sucesso.");
                //navigate("/");
              })
              .catch((err) => {
                notifyError(
                  "Falha ao carregar as ocorrências iniciais.",
                  err.message
                );
                //navigate("/");
              });
          });
        } */
      })
      .catch((err) => {
        notifyError("Erro ao carregar a lista de ocorrências");
      });
  }, [ocorrencias]);

  const navigate = useNavigate();

  useEffect(
    () => {
      getCategoriasOcorrencias();
      getOcorrencias();
    },
    [
      /* ocorrencias, tipoOcorrenciaLista */
    ]
  );

  const [ocorrenciaId, setOcorrenciaId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const [ocorrenciaUnica, setOcorrenciaUnica] = useState();

  const handleClickOcorrencia = (id) => {
    axios
      .get(`/api/ocorrencia/${id}`)
      .then((response) => setOcorrenciaUnica(response.data))
      .catch((error) => notifyError("Falha na exibição da ocorrência."));
    setShowModalOcorrencia(true);
  };

  const [ocorrenciasCopy, setOcorrenciasCopy] = useState([]);
  const filtro = (valor) => {
    setBairroSelecionado(valor);
    const ocorrenciasFiltradas = ocorrencias.filter((ocorrencia) => {
      return ocorrencia.bairro.toLowerCase() == valor.toLowerCase();
    });
    setOcorrenciasCopy(ocorrenciasFiltradas);
  };

  const cancelFiltro = () => {
    setBairroSelecionado("selecione");
    setOcorrenciasCopy([]);
  };

  const OcorrenciasFiltro = () => (
    <div className="flex space-x-4 justify-end pr-4">
      <div className="relative h-10 min-w-[200px]">
        <select
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={bairroSelecionado}
          onChange={(e) => filtro(e.target.value)}
        >
          <option value="selecione">Selecione</option>
          {ocorrencias.map(({ bairro }, id) => (
            <option key={id} value={bairro}>
              {bairro}
            </option>
          ))}
        </select>
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Selecione um bairro
        </label>
      </div>
      <button onClick={cancelFiltro}>Cancelar Filtro</button>
    </div>
  );

  const OcorrenciasLista = (/* {ocorrenciasCopy} */) =>
    ocorrenciasCopy.length == 0
      ? ocorrencias.map(
        ({
          id,
          categoria,
          bairro,
          cidade,
          dataHoraOcorrencia,
          hora,
          avaliacao,
          usuario,
        }) => (
          <div
            onClick={() => handleClickOcorrencia(id)}
            key={id}
            className="mt-4 bg-blue-100 hover:bg-blue-200 p-4 rounded border font border-gray-300 flex flex-col"
          >
            <p className="font-semibold">{categoria.nome}</p>
            {/*-- Avaliação por Votos */}
            <VoteOcorrencia
              userId={usuarioId}
              ocorrId={id}
              avaliacao={avaliacao}
            />
            {/*Avaliação por Votos -- */}
            <div className="flex gap-4 justify-around">
              <div className="regiao">
                <p className="text-gray-600 flex gap-2">
                  <span className="self-center bg-pin-icon w-4 h-5"></span>
                  {bairro}
                  <br />
                  {cidade}
                </p>
              </div>
              <div className="horario">
                <p className="text-gray-600 flex gap-2">
                  <span className="self-center bg-clock-icon w-4 h-3.5"></span>
                  {dataHoraOcorrencia}
                  <br />
                  {hora}
                </p>
              </div>
              <div className="self-end">
                <DeletarOcorrencia
                  idOcorr={id}
                  ocorrs={ocorrencias}
                  setOcorrList={setOcorrencias}
                  usuario={usuario}
                />
              </div>
            </div>
          </div>
        )
      )
      : ocorrenciasCopy.map(
        (
            /* ocorrencia, id */ {
            id,
            categoria,
            bairro,
            cidade,
            dataHoraOcorrencia,
            hora,
            avaliacao,
            usuario,
          }
        ) => (
          <div
            onClick={() => handleClickOcorrencia(id)}
            key={id}
            className="mt-4 bg-blue-100 hover:bg-blue-200 p-4 rounded border font border-gray-300 flex flex-col"
          >
            <p className="font-semibold">{categoria.nome}</p>
            {/*-- Avaliação por Votos */}
            <VoteOcorrencia
              userId={usuarioId}
              ocorrId={id}
              avaliacao={avaliacao}
            />
            {/*Avaliação por Votos -- */}
            <div className="flex gap-4 justify-around">
              <div className="regiao">
                <p className="text-gray-600 flex gap-2">
                  <span className="self-center bg-pin-icon w-4 h-5"></span>
                  {bairro}
                  <br />
                  {cidade}
                </p>
              </div>
              <div className="horario">
                <p className="text-gray-600 flex gap-2">
                  <span className="self-center bg-clock-icon w-4 h-3.5"></span>
                  {dataHoraOcorrencia}
                  <br />
                  {hora}
                </p>
              </div>
              <div className="self-end">
                <DeletarOcorrencia
                  idOcorr={id}
                  ocorrs={ocorrencias}
                  setOcorrList={setOcorrencias}
                  usuario={usuario}
                />
              </div>
            </div>
          </div>
        )
      );
  const OcorrenciaDetalhes = () => (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none fixed min-w-[550px] my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 p-[20px] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex justify-between items-center">
            <h1 className="text-black text-[24px] font-sora font-bold text-left">
              Detalhes da Ocorrência
            </h1>
            <button
              className="font-normal px-[20px] font-rubik text-[14px] py-[5px] rounded-lg bg-black text-white"
              type="button"
              onClick={() => setShowModalOcorrencia(false)}
            >
              FECHAR
            </button>
          </div>
          <div className="h-[1px] w-full mt-[18px] bg-slate-400"></div>
          <div className="pt-[35px] font-rubik">
            <h2 className="text-[18px] font-bold">
              Tipo de delito:{" "}
              <span className="font-normal">
                {ocorrenciaUnica.categoria.nome}
              </span>
            </h2>
            <div className="pt-[12px] font-[18px] flex flex-col gap-2">
              <div className="h-[1px] w-full bg-slate-200"></div>
              <p className="pt-1 font-bold text-[18px] pb-1">
                Cidade:{" "}
                <span className="font-normal">{ocorrenciaUnica.cidade}</span>
              </p>
              <div className="h-[1px] w-full bg-slate-200"></div>
              <p className="pt-1 font-bold text-[18px] pb-1">
                Bairro:{" "}
                <span className="font-normal">{ocorrenciaUnica.bairro}</span>
              </p>
              <div className="h-[1px] w-full bg-slate-200"></div>
            </div>
          </div>
          {/*footer*/}
          <div className="bg-[#f1f1f1] mt-[20px] rounded-[8px] px-1 pt-2 pb-10">
            <p className="pt-1 pl-[12px] font-rubik font-bold text-[18px] pb-1">
              Descrição:{" "}
              <span className="font-normal">{ocorrenciaUnica.descricao}</span>
            </p>
          </div>
          {/* Mídias */}
          <div className="bg-[#f1f1f1] mt-[20px] rounded-[8px] px-1 pt-2 pb-10 flex flex-col justify-center gap-3 items-center">
            <p className="pt-1 pl-[12px] font-rubik font-bold text-[18px] pb-1">
              Fotos e Vídeos
              {/* {console.log(ocorrenciaUnica.midias)} */}
            </p>
            {ocorrenciaUnica.midias.map(({ midiaUrl, id }) =>
              midiaUrl.slice(-3) == "mp4" ? (
                <video
                  key={id}
                  style={{ width: "50hw", height: "50vh" }}
                  controls
                  loop
                  className="mt-1 mb-3"
                >
                  <source src={midiaUrl} type="video/mp4" />
                </video>
              ) : (
                <img src={midiaUrl} alt="" className="mt-1 mb-3 w-3/4" />
              )
            )}
            {/* explicitar no DropZone que apenas upload de mp4 é possível para vídeos para facilitar quando usar a api de midia em listagens */}
            {/* <video
                  style={{ width: "50hw", height: "50vh" }}
                  controls
                  loop // className="mt-1 mb-3"
                >
                  <source src={TestVideo} type="video/mp4" />
                </video> */}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex space-x-4 justify-between items-center mt-6">
          <div className="flex gap-10">
            {/* <button className="bg-black text-white font-bold py-2 px-4 rounded">
              Minhas Ocorrências
            </button> */}
            <button
              onClick={() => {
                //console.log(usuarioId)
                if (!localStorage?.id) {
                  notifyError("Faça seu login para registrar uma ocorrência.");
                } else {
                  setShowModal(true);
                }
              }}
              className="bg-black text-white font-bold py-2 px-4 rounded"
            >
              Nova Ocorrência
            </button>
          </div>
          <OcorrenciasFiltro />
        </div>

        <div className="flex relative justify-between gap-10 items-start pt-10">
          {/* Mapa da listagem de ocorrências */}
          <div className="sticky top-0">
            <OcorrenciasMap />
          </div>

          {/* Listagem de Ocorrências */}
          <div className="flex-1 hover:cursor-pointer">
            <OcorrenciasLista />
          </div>
        </div>
      </div>
      {/* MODAL */}
      {showModal ? (
        <div className="flex justify-between">
          {/* <NovaOcorrenciaForm // handleSubmit={handleSubmit}
          /> */}
          <NovaOcorrenciaForm
            setShowModal={setShowModal}
            setOcorrencias={setOcorrencias}
            handleSubmit={handleSubmit}
          />
          {/* Background Overlay */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
      {/* MODAL DETALHES OCORRENCIA*/}
      {showModalOcorrencia && ocorrenciaUnica ? <OcorrenciaDetalhes /> : null}
      <div className="mt-40">
        <Footer />
      </div>
    </>
  );
};

export default Ocorrencia;
