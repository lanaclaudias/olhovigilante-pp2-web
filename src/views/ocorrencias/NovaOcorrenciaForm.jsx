import DropZone from "../../util/DropZone";
import { TipoOcorrenciaSelect } from "./TipoOcorrenciaSelect";
import { useState } from "react";
import NovaOcorrenciaMap from "./NovaOcorrenciaMap";

const handleUpload = (midias) => {
  // iterar por todas as mídias para fazer as requisições de da api de mídia
  //console.log("midias: ", midias);
  setMidiasArr(midias /* [...midias, midias] */);
};

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

const NovaOcorrenciaForm = ({handleSubmit}) => {
  const [tipoOcorrenciaLista, setTipoOcorrenciaLista] = useState([]);
  const [descricao, setDescricao] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [midia, setMidia] = useState();
  const [usuarioId, setUsuarioId] = useState(
    parseInt(localStorage.getItem(USERID_SESSION_ATTRIBUTE_NAME))
  );
  const [categoriaId, setCategoriaId] = useState();
  const [ocorrencias, setOcorrencias] = useState([]);
  const [midiasArr, setMidiasArr] = useState([]);
  
  return (
      <form
            name="ocorrenciaForm"
            id="ocorrenciaForm"
            onSubmit={handleSubmit}
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="px-6 flex justify-between items-center">
                  <h1 className="text-black font-sora text-[24px] font-bold pt-4">
                    Nova Ocorrência
                  </h1>
                  <button
                    className="font-normal px-[20px] font-rubik text-[14px] py-[5px] rounded-lg bg-black text-white"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    FECHAR
                  </button>
                </div>

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
                  {/* Mapa de Registro de Ocorrência */}
                  {/* <MyMap /> */}
                  <NovaOcorrenciaMap setReportMarker={setReportMarker} />
                </div>
                {/* Mapa de Registro de Ocorrência */}
                {/* <MyMap /> */}
                {/* <NovaOcorrenciaMap setReportMarker={setReportMarker} /> */}
                {/*footer*/}
                <div className="flex gap-[20px] items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b text-white">
                  <button
                    className="font-bold bg-blue-400 px-[52px] py-[12px] rounded-lg mt-3"
                    type="submit"
                  >
                    SALVAR
                  </button>

                  <button
                    className="font-bold px-[52px] py-[12px] rounded-lg mt-3 bg-red-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    FECHAR
                  </button>
                </div>
              </div>
            </div>
          </form>
    )
  };

export default NovaOcorrenciaForm;