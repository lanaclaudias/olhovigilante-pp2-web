import React from 'react';
import Header from './components/Header/Header';

const fields = [
  { label: 'Tipo de delito', type: 'text' },
  { label: 'Descrição', type: 'textarea' },
  { label: 'Cidade', type: 'text' },
  { label: 'Bairro', type: 'text' },
  { label: 'Data', type: 'date' },
  { label: 'Hora', type: 'time' },
  { label: 'Presença policial?', type: 'radio', values: ['Sim', 'Não'] },
  { label: 'Ação policial?', type: 'text' },
  { label: 'Motivação', type: 'textarea' },
  { label: 'Quantidade de vitimas', type: 'text' },
  { label: 'Midia', type: 'file' },
  { label: 'Geolocalização', type: 'text' },
];

const Ocorrencia = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-white text-center">Faça uma Ocorrência!</h2>
        <div className="flex space-x-4 justify-center items-center">
          <button className="bg-black text-white font-bold py-2 px-4 rounded">
            Minhas Ocorrências
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white font-bold py-2 px-4 rounded"
          >
            Nova Ocorrência
          </button>
          <div className="flex space-x-4 justify-end pr-4">
            {' '}
            {/* Adicionando a classe pr-4 para margem direita */}
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
        <div className="container mx-auto mt-4 p-4 rounded border border-gray-300 w-1/2">
          {' '}
          {/* Definindo a largura para 50% (w-1/2) */}
          <p className="text-black font-semibold">
            Assalto Próximo à Estação de Jaboatão
          </p>
          <p className="text-gray-600">16/10/2023 20:40</p>
        </div>
        <form>
          <input type="text" id="nome" required />
        </form>
      </div>

      {/* MODAL */}

      {showModal ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h1 className="text-black text-[24px] font-bold text-center pt-4">
                  NOVA OCORRÊNCIA
                </h1>
                <div className="relative p-6 flex-auto">
                  {fields.map(({ label, type, values }) => (
                    <div key={label}>
                      <label className="block text-black font-bold">
                        {label}
                      </label>
                      {type === 'textarea' ? (
                        <textarea
                          placeholder={label}
                          className="border rounded-[6px] p-3 w-full mb-4 text-black"
                        />
                      ) : type === 'radio' ? (
                        <div className="flex">
                          {values.map((value, index) => (
                            <div key={index} className="mr-4">
                              <input
                                type={type}
                                value={value}
                                name={label}
                                className="mr-1"
                              />
                              <label htmlFor={value} className="text-black">
                                {value}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : type === 'file' ? (
                        <input
                          type="file"
                          className="border rounded-[6px] p-3 w-full mb-4 text-black"
                        />
                      ) : (
                        <input
                          type={type}
                          placeholder={label}
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
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    SALVAR
                  </button>
                </div>
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
