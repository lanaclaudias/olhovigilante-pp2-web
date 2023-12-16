import axios from "axios";
import { notifyError, notifySuccess } from "./util/Util";

const DeletarOcorrencia = ({ idOcorr, ocorrs, setOcorrList }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    let url = `http://localhost:8082/api/ocorrencia/${idOcorr}`;
    axios
      .delete(url)
      .then((res) => {
        notifySuccess("Ocorrência apagada com sucesso");
        let ocorrsList = ocorrs.filter(
            elem => elem.id !== idOcorr
        );
        setOcorrList(ocorrsList);
      })
      .catch((err) => notifyError("Erro ao apagar a ocorrência"));
  };
  return (
    <button
      className="w-5 h-[1.4em] bg-trash-icon hover:bg-trash-hover-icon"
      onClick={handleClick}
    ></button>
  );
};
export default DeletarOcorrencia;
