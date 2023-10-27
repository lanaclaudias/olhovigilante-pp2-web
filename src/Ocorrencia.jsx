import React from 'react';
import Logo from './assets/logprovi.png';
import Header from './components/Header/Header';

const Ocorrencia = () => {
  return (
    <> 
    <Header/>
    <div className="container">
      <h2 className="text-white text-center">Faça uma Ocorrência!</h2>
      <div className="flex space-x-4 justify-center items-center">
        <button className="bg-black text-white font-bold py-2 px-4 rounded">
          Minhas Ocorrências
        </button>
        <button className="bg-black text-white font-bold py-2 px-4 rounded">
          Nova Ocorrência
        </button>
        <div className="flex space-x-4 justify-end pr-4"> {/* Adicionando a classe pr-4 para margem direita */}
          <div className="flex">
            <input
              type="text"
              placeholder="Buscar"
              className="border rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 p-4 rounded border border-gray-300 w-1/2"> {/* Definindo a largura para 50% (w-1/2) */}
        <p className="text-black font-semibold">Assalto Próximo à Estação de Jaboatão</p>
        <p className="text-gray-600">16/10/2023  20:40</p>
      </div>
      <form>
        <input type="text" id="nome" required />
      </form>
    </div>
    </>
  );
};

export default Ocorrencia;
