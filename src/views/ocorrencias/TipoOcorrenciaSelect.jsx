import React from "react";

export const TipoOcorrenciaSelect = (props) => {
  return (
    <>
      <select
        id="tiposOcorrencias"
        className={props.className}
        onChange={props.handleChange}
      >
        <option value="">Selecione Uma Categoria</option>
        {props.lista &&
          props.lista.map((elem) => (
            <option key={elem.nome} value={elem.id}>
              {elem.nome}
            </option>
          ))}
      </select>
    </>
  );
};
