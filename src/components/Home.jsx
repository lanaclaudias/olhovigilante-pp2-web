import React from 'react';
import Header from "./Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Barra de Navegação */}
        <div className="">
          {/* Banner */}
        <div className={`bg-right bg-[url(/olho.png)] w-full bg-cover flex items-center bg-no-repeat h-[700px]`} >
        <div className="container">
          
        <div className='container'>
            
            <div className="container">
              <p className="text-sky w-[750px] text-[35px] font-bold pt-[30px] pb-5">
              No Olho Vigilante, proporcionamos uma experiência intuitiva e eficiente para conduzir pesquisas relacionadas a incidentes, estatísticas e informações relevantes. Nossa plataforma robusta permite que os usuários realizem pesquisas abrangentes, filtrando dados específicos e obtendo insights valiosos para melhor compreensão e consciência da segurança em suas comunidades.
              </p>

              <button className="bg-black text-white font-bold py-5 px-9 flex items-center rounded">
                CADASTRE-SE
              </button>

            </div>
          </div>
        
  </div>
 </div>
</div>

<div className={`bg-sky-950 pt-[70px] pb-1`} >

<div className="container">
              <p className="text-white w-[599px] text-left text-[35px] font-bold pb-4">
              Como Podemos te Ajudar?
              </p>
              <p className="text-white w-[599px] text-left text-[20px] pb-10">
              Cada uma das opções abaixo abre um leque de informações para melhorar sua experiência.
              </p>

<div className='flex gap-1 h-[170px]'>

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
<div className='h-[300px] text-white bg-black'>

  <div className='container flex gap-1 justify-between pt-20 text-[20px]'>

<div className=' ' > 
<p>
Rua Jurema, 10 - Centro, Jaboatão Dos Guararapes/PE
</p>

<p>
CEP: 50000-111

</p>
<p>
CNPJ: 00.000.000/0001-00
</p>

</div>

<div>

<p className="container text-white">
contato@olhovigilante.com.br
</p>
 
 <p>
 (81) 9 0800-0800
 </p>

</div>

<div>
<p>
Inicio
</p>
<p>
Ocorrências
</p>
<p>
Comunidade
</p>
<p>
Onde Denunciar
</p>

</div>
</div>


<div className='flex justify-center pt-10'>
<p className='text-white w-[599px] text-left text-[20px] mx-10px'>

© 2023  Olho Vigilante | Todos os direitos reservados.
</p>
<div>


  
</div>
</div>
</div>

</div>
      
</>
);
};

export default Home;

