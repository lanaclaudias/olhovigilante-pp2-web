import React from 'react';
import Header from "./Header/Header";
import Banner from "../assets/banner.png";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Barra de Navegação */}
        <div className="container p-4">
          {/* Banner */}
          <div className="relative">
            <img src={Banner} alt="Banner" className="w-full" />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center p-4 text-center">
              <p className="text-white text-lg font-bold">
                Aqui, você pode compartilhar informações, conhecer seus
                vizinhos, sua cidade, e ajudar a tornar sua comunidade mais
                segura. Junte-se a nós!
              </p>
            </div>
          </div>

          {/* Botões e Barra de Busca */}
          <div className="flex space-x-4 justify-between items-center pt-4">
            <div className="flex gap-10">
              <button className="bg-black text-white font-bold py-2 px-4 rounded">
                Minhas Ocorrências
              </button>

              <button className="bg-black text-white font-bold py-2 px-4 rounded">
                Nova Ocorrência
              </button>
            </div>

            <div className="flex space-x-4 justify-end pr-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="border-2 border-blue-500 rounded-tl-none px-10 py-2 focus:outline-none focus:ring focus:border-blue-800"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                  Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-4 p-4 rounded border border-gray-300 w-1/2">
            <p className="text-black font-semibold">
              Assalto Próximo à Estação de Jaboatão
            </p>
            <p className="text-gray-600">16/10/2023 20:40</p>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;
