import React from 'react';
import Header from "./Header/Header";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Barra de Navegação */}
        <div className="">
          {/* Banner */}
          <div className="relative">

        <div className={`bg-[url(/olho.png)] w-full bg-cover flex items-center bg-no-repeat h-[800px]`} >
        <div className='container'>
            
            <div className="container">
              <p className="text-black w-[590px] text-left text-[35px] font-bold">
              No Olho Vigilante, proporcionamos uma experiência intuitiva e eficiente para conduzir pesquisas relacionadas a incidentes, estatísticas e informações relevantes. Nossa plataforma robusta permite que os usuários realizem pesquisas abrangentes, filtrando dados específicos e obtendo insights valiosos para melhor compreensão e consciência da segurança em suas comunidades.
              </p>
              <a href="/cadastro">
                <button className="bg-black text-white font-bold py-5 px-9 flex items-center rounded">
                CADASTRE-SE
              </button>
              </a>

            </div>
          </div>

  </div>
 </div>
</div>

<div className={`bg-black pt-[150px] pb-1`} >

<div className="container">
              <p className="text-white w-[599px] text-left text-[35px] font-bold pb-4">
              Como Podemos te Ajudar?
              </p>
              <p className="text-white w-[599px] text-left text-[20px] pb-10">
              Cada uma das opções abaixo abre um leque de serviços para sua necessidade.
              </p>

<div className='flex gap-1'>

<button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
              PESQUISAR
              </button>
              <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
              COLABOARAÇÃO
              </button>
              <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
              OCORRÊNCIAS
              </button>
              <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
              COMUNIDADE
              </button>
              <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
              ARTIGOS
              </button>
              <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
              FALAR CONOSCO
              </button>


</div>

</div>
</div>



</div>


      
</>
);
};

export default Home;
