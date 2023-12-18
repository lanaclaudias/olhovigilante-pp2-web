import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Header from "./components/Header/Header";
import categorias from "./categorias.json";
import axios from "axios";
//import MyMap from "./MyMap";
import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { MapContainer, useMap, TileLayer } from "react-leaflet";
import L from "leaflet";
import {
  isUserLoggedIn,
  getUserId,
  USERID_SESSION_ATTRIBUTE_NAME,
} from "./util/AuthenticationService";

import TestVideo from "/testvideo.mp4";
import centerMarkerIcon from "/centermarker.png";
import dangerMarkerIcon from "/danger-icon.png";
import { notifyError, notifySuccess } from "./util/Util";
import FileUploader from "./util/FileUploader";
import DropZone from "./util/DropZone";

const TipoOcorrenciaSelect = (props) => {
  return (
    <>
      {/* <label for="tipoOcorrencia" className="block mb-2 text-sm font-medium">Select an option</label> */}
      <select
        id="tiposOcorrencias"
        className={props.className}
        onChange={props.handleChange}
      >
        <option value="">Selecione Uma Categoria</option>
        {categorias.categories.map(({ id, label }) => (
          <option key={id} value={label} id={id}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

let temp;
const handleTempLatLng = (newState) => {
  //setbairro and setcidade after reverse geocoding newState's latlng
  temp = newState._latlng;
};

const Ocorrencia = () => {
  // Acrescentar value: {state} ao array de fields para os inputs
  // e incluir value como atributo durante a iteração para o render condicional?

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
      //pattern: "\d{1,2}/\d{1,2}/\d{4}",
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
      handleChange: (e) => {
        setMidia(e.target.value);
      },
    }, // implementação apropriada para múltiplos arquivos pendente e necessita integrar com a API de Mídia já configurada com suas associações
    /* {
      label: "Geolocalização",
      type: "text",
      //value: temp,
      //handleChange: (e) => setGeolocalizacao(e.target.value),
      disabled: true,
    }, */
    /* {
      label:
        "ID do Usuário (campo temporário pela falta de implementação de login)",
      type: "text",
      handleChange: (e) => setUsuarioId(parseInt(e.target.value)),
    }, // campo temporário até a implementação do login de usuário */
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
  /* Mapa */ // Investigar bug na reatividade dos mapas durante interação com os campos do formulário
  const Map = ({ apiKey }) => {
    const initialCenter = [-8.063153, -34.87114];
    //const centerIcon = new L.Icon({ iconUrl: centerMarkerIcon });

    const map = useMap();
    const [marker, setMarker] = useState(L.marker(initialCenter));
    map.setView(initialCenter, 10);

    if (ocorrencias) {
      let icon = L.icon({
        iconUrl: dangerMarkerIcon,
        iconSize: [30, 30],
        //iconAnchor: [0, 0],
        //popupAnchor: [-3, -76],
        //shadowUrl: 'my-icon-shadow.png',
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
      });
      ocorrencias.map((elem) => {
        if (elem.geolocalizacao && elem.geolocalizacao.length > 10) {
          let latlng = elem.geolocalizacao.split(",");
          //console.log(elem.geolocalizacao.split(','))
          //let ocorrenciaMarker = L.marker(elem.geolocalizacao.split(',')).bindPopUp(elem.categoria.nome).addTo(map);
          L.marker(latlng, { alt: elem.categoria.nome, icon: icon })
            .bindPopup(elem.categoria.nome, {})
            .addTo(map);
          // .bindTooltip(elem.categoria.nome, {permanent: true}).addTo(map);
        }
      });
    }
    const provider = new MapBoxProvider({
      params: {
        access_token: apiKey,
      },
    });

    const searchControl = new GeoSearchControl({
      provider: provider,
      searchLabel: "Insira o endereço",
      notFoundMessage: "Não encontrado. Insira na ordem 'Rua, Bairro, Cidade'.",
      style: "bar",
      //keepResult: true
    });

    // Bug: Marcador inicial não é arrastável
    // fixar ponto flutuante em 7 antes de fazer queries
    //console.log("before drag: ", marker.getLatLng());

    map.on("click", (e) => {
      if (marker) {
        marker.removeFrom(map);
      }

      let mrk = L.marker(e.latlng, { draggable: true, autoPan: true }).on(
        "dragend",
        (e) => {
          mrk.setLatLng(e.target._latlng);
          setMarker(mrk);
          handleTempLatLng(mrk);
          /* console.log("temp after drag ", temp) */
        }
      );
      setMarker(mrk);
      handleTempLatLng(mrk);
      /* console.log("temp after click ", temp) */
    });
    marker.addTo(map);
    map.setView(marker.getLatLng(), 20);
    handleTempLatLng(marker);
    /* console.log("temp after click and drag: ", temp) */

    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };

  const MyMap = () => {
    return (
      <>
        <MapContainer style={{ height: "60vh", width: "60vh" }}>
          <Map apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </>
    );
  };

  const getCategoriasOcorrencias = React.useCallback(() => {
    axios
      .get("http://localhost:8082/api/categoriaocorrencia")
      .then((res) => {
        setTipoOcorrenciaLista(res.data);
        /* if(res.data.length == 0) { axios.post("http://localhost:8082/api/categoriaocorrencia/populate")
        .then((r) => setTipoOcorrenciaLista(r.data)); } // precisa fazer populate retornar um array com todas as categorias */
      })
      .catch((err) => {
        setTipoOcorrenciaLista([{ nome: "Lista Vazia" }]);
        console.log("Nenhuma categoria de ocorrência encontrada.");
      });
  }, [tipoOcorrenciaLista]);

  const getOcorrencias = React.useCallback(() => {
    axios
      .get("http://localhost:8082/api/ocorrencia")
      .then((res) => {
        setOcorrencias(res.data);
        setOcorrenciasOriginais(res.data);
        //console.log(ocorrencias);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ocorrencias]);

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
  // Sharing states between components
  const handleUpload = (midias) => {
    // iterar por todas as mídias para fazer as requisições de da api de mídia
    //console.log("midias: ", midias);
    setMidiasArr(midias /* [...midias, midias] */);
  };

  const handleSubmit = (e) => {
    //console.log("midiasArr: ", midiasArr);
    e.preventDefault();
    const ocorrenciaRequest = {
      descricao,
      cidade,
      bairro,
      dataHoraOcorrencia: data, // alterar formatação (data + hora)
      hora,
      //midia,
      geolocalizacao: "" + temp.lat + "," + temp.lng,
      usuarioId,
      categoriaId,
    };

    axios
      .post("http://localhost:8082/api/ocorrencia", ocorrenciaRequest)
      .then((response) => {
        // Nova implementação
        //console.log("midiasArr: ", midiasArr, "\nOcorrencia ID: ", response.data.id)
        midiasArr.map(({ fileUrl }) => {
          const midiaRequest = {
            ocorrenciaId: response.data.id,
            midiaUrl: fileUrl,
          };
          axios
            .post("http://localhost:8082/api/midia", midiaRequest)
            .then((res) => {
              //console.log("Midia cadastrada: ", res.data)
            })
            .catch((err) => notifyError("Falha no upload dos arquivos."));
        });

        setOcorrencias([...ocorrencias, response.data]);
        setShowModal(false);
        notifySuccess("Ocorrencia cadastrada com sucesso.");
      })
      .catch((err) => {
        notifyError("Falha ao cadastrar a ocorrência.", err.message);
      });
  };

  const [ocorrenciaUnica, setOcorrenciaUnica] = useState();

  const handleClickOcorrencia = (id) => {
    axios
      .get(`http://localhost:8082/api/ocorrencia/${id}`)
      .then((response) => setOcorrenciaUnica(response.data))
      .catch((error) => notifyError(error.message));
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

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex space-x-4 justify-between items-center mt-6">
          <div className="flex gap-10">
            <button className="bg-black text-white font-bold py-2 px-4 rounded">
              Minhas Ocorrências
            </button>
            <button
              onClick={() => {
                //console.log(usuarioId)
                if (!localStorage?.id) {
                  notifyError("Faça seu login para registrar uma ocorrência.");
                } else {
                  setShowModal(true);
                }
                //if(localStorage)
              }}
              className="bg-black text-white font-bold py-2 px-4 rounded"
            >
              Nova Ocorrência
            </button>
          </div>
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
        </div>

        <div className="flex relative justify-between gap-10 items-start pt-10">
          <div className="sticky top-0">
            {/* Mapa listando todas as ocorrências */}
            <MyMap />
          </div>

          {/* Listagem de Ocorrências */}
          <div className="flex-1 hover:cursor-pointer">
            {ocorrenciasCopy.length == 0
              ? ocorrencias.map((ocorrencia, id) => (
                  <div
                    key={id}
                    onClick={() => handleClickOcorrencia(ocorrencia.id)}
                    className="mt-4 bg-blue-100 hover:bg-blue-200 p-4 rounded border font border-gray-300 flex flex-col"
                  >
                    <p className="font-semibold">{ocorrencia.categoria.nome}</p>
                    <div className="flex gap-4 justify-between">
                      <p className="text-gray-600">
                        {ocorrencia.bairro}, {ocorrencia.cidade}
                      </p>
                      <p className="text-gray-600">
                        {ocorrencia.dataHoraOcorrencia}
                      </p>
                    </div>
                  </div>
                ))
              : ocorrenciasCopy.map((ocorrencia, id) => (
                  <div
                    key={id}
                    onClick={() => handleClickOcorrencia(ocorrencia.id)}
                    className="mt-4 bg-blue-100 hover:bg-blue-200 p-4 rounded border font border-gray-300 flex flex-col"
                  >
                    <p className="font-semibold">{ocorrencia.categoria.nome}</p>
                    <div className="flex gap-4 justify-between">
                      <p className="text-gray-600">
                        {ocorrencia.bairro}, {ocorrencia.cidade}
                      </p>
                      <p className="text-gray-600">
                        {ocorrencia.dataHoraOcorrencia}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/* MODAL */}
      {showModal ? (
        <div className="flex justify-between">
          <form
            name="ocorrenciaForm"
            id="ocorrenciaForm"
            onSubmit={handleSubmit}
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            {/* <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
            <MyMap />
            </div> */}

            <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h1 className="text-black font-sora text-[24px] font-bold text-center pt-4">
                  NOVA OCORRÊNCIA
                </h1>
                <div className="relative p-6 flex-auto overflow-hidden">
                  {fields.map(
                    ({
                      label,
                      type,
                      values,
                      disabled,
                      handleChange,
                      handleBlur,
                    }) => (
                      <div key={label}>
                        <label className="block text-black font-bold">
                          {label}
                        </label>
                        {type === "textarea" ? (
                          <textarea
                            key={label}
                            placeholder={label}
                            onChange={handleChange}
                            className="border rounded-[6px] p-3 w-full mb-4 text-black"
                          />
                        ) : type === "file" ? (
                          //< FileUploader />
                          <div key={label} className="flex justify-center">
                            <DropZone
                              onUpload={handleUpload}
                              ocorrenciaId={ocorrenciaId}
                            />
                          </div>
                        ) : type === "select" ? (
                          <TipoOcorrenciaSelect
                            key={label}
                            lista={tipoOcorrenciaLista}
                            className="border rounded-[6px] p-3 w-full mb-4 text-black"
                            handleChange={handleChange}
                            // handleBlur={handleBlur}
                          />
                        ) : (
                          <input
                            key={label}
                            type={type}
                            placeholder={label}
                            onChange={handleChange}
                            disabled={disabled}
                            className="border rounded-[6px] p-3 w-full mb-4 text-black"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
                {/* Mapa de Registro de Ocorrência */}
                {/* <MyMap /> */}
                {/* <NovaOcorrenciaMap setReportMarker={setReportMarker} /> */}
                {/*footer*/}
                <div className="flex gap-[20px] items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b text-white">
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
                  >
                    SALVAR
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
      {/* MODAL DETALHES OCORRENCIA*/}
      {showModalOcorrencia && ocorrenciaUnica ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none fixed min-w-[550px] my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 p-[20px] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex justify-between items-center">
                <h1 className="text-black text-[24px] font-sora font-bold text-left">
                  Detalhes da ocorrência
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
                    <span className="font-normal">
                      {ocorrenciaUnica.cidade}
                    </span>
                  </p>
                  <div className="h-[1px] w-full bg-slate-200"></div>
                  <p className="pt-1 font-bold text-[18px] pb-1">
                    Bairro:{" "}
                    <span className="font-normal">
                      {ocorrenciaUnica.bairro}
                    </span>
                  </p>
                  <div className="h-[1px] w-full bg-slate-200"></div>
                </div>
              </div>
              {/*footer*/}
              <div className="bg-[#f1f1f1] mt-[20px] rounded-[8px] px-1 pt-2 pb-10">
                <p className="pt-1 pl-[12px] font-rubik font-bold text-[18px] pb-1">
                  Descrição:{" "}
                  <span className="font-normal">
                    {ocorrenciaUnica.descricao}
                  </span>
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
      ) : null}
      <div className="mt-[120px] h-[275px] text-white bg-black">
        <div className="container flex gap-1 justify-between pt-20 text-[20px]">
          <div>
            <p>Rua Jurema, 10 - Centro, Jaboatão Dos Guararapes/PE</p>

            <p>CEP: 50000-111</p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>

          <div>
            <p className="container text-white">contato@olhovigilante.com.br</p>

            <p>(81) 9 0800-0800</p>
          </div>

          <div>
            <a href="/">
              <p>Inicio</p>
            </a>
            <a href="/ocorrencia">
              <p>Ocorrências</p>
            </a>
            <a href="/comunidade">
              <p>Comunidade</p>
            </a>
            <a href="/denunciar">
              <p>Onde Denunciar</p>
            </a>
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <p className="text-white w-[599px] text-left text-[20px] mx-10px">
            © 2023 Olho Vigilante | Todos os direitos reservados.
          </p>
        </div>
      </div>
    </>
  );
};

export default Ocorrencia;
