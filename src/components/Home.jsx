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

        <div className={`bg-[url(/inicio.png)] w-full bg-cover flex items-center bg-no-repeat h-[800px] `} >
        <div className='container'>
            
            <div className="container">
              <p className="text-black w-[599px] text-left text-[35px] font-bold">
                Aqui, você pode compartilhar informações, conhecer seus
                vizinhos, sua cidade, e ajudar a tornar sua comunidade mais
                segura. Junte-se a nós!
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

<div className="container flex pt-[200px]">
  <div className='bg-sky-500 w-[400px] p-5'>
<p className="text-black text-left text-[35px] font-bold pb-6">
              MAPA DE ATUAÇÃO
              </p>
<p className="text-black text-left text-[20px] pb-6 p-3">
O Mapa de Atuação do Olho Vigilante é baseado nas necessidades específicas da comunidade e dedicada à segurança pública, onde, estabelece sua presença através de um abrangente mapa de atuação. Esse mapa é mais do que uma simples representação geográfica; é a espinha dorsal que sustenta a eficácia e o alcance da organização.
</p>
</div>
<div className='w-[360px] p-5'>
<p className="text-black text-left text-[35px] font-bold pb-6">
PESQUISAR
              </p>
<p className="text-black text-left text-[20px] pb-6 p-3">
No Olho Vigilante, proporcionamos uma experiência intuitiva e eficiente para conduzir pesquisas relacionadas a incidentes, estatísticas e informações relevantes. Nossa plataforma robusta permite que os usuários realizem pesquisas abrangentes, filtrando dados específicos e obtendo insights valiosos para melhor compreensão e consciência da segurança em suas comunidades.

</p>

</div>

  <div className='w-[360px] p-5'>
<p className="text-black text-left text-[35px] font-bold pb-6">
              OCORRÊNCIAS
              </p>
<p className="text-black text-left text-[20px] pb-6 p-3">
Registre e acesse informações sobre ocorrências recentes em sua área. Nosso sistema permite que os usuários relatem incidentes, forneçam detalhes cruciais e acompanhem as atualizações sobre a resolução dessas ocorrências. Juntos, podemos criar uma base de dados confiável e acessível para melhorar a segurança em tempo real.
</p>
</div>

</div>

<div className="container flex pt-[200px]">
  <div className='w-[400px] p-5'>
<p className="text-black text-left text-[35px] font-bold pb-6">
              COMUNIDADE
              </p>
<p className="text-black text-left text-[20px] pb-6 p-3">
A seção dedicada à comunidade é um espaço inclusivo para compartilhar notícias, eventos locais e discussões relevantes sobre segurança pública. Nossa comunidade é um ponto de encontro para residentes, líderes comunitários e profissionais discutirem estratégias, compartilharem recursos e promoverem a segurança coletiva.
</p>
</div>
<div className='w-[360px] p-5'>
<p className="text-black text-left text-[35px] font-bold pb-6">FALAR CONOSCO
              </p>
<p className="text-black text-left text-[20px] pb-6 p-3">
Valorizamos seu feedback e suas perguntas. A seção "Falar Conosco" oferece uma maneira direta de entrar em contato conosco para relatar problemas, fornecer sugestões ou esclarecer dúvidas. Estamos comprometidos em ouvir nossa comunidade e adaptar nossos serviços para atender às suas necessidades, garantindo que sua voz seja ouvida e considerada em nossos esforços contínuos para promover a segurança pública.

</p>

</div>

  <div className='w-[360px] p-5'>
<p className="text-black text-left text-[35px] font-bold pb-6">
              COLABORAÇÃO
              </p>
<p className="text-black text-left text-[20px] pb-6 p-3">
Acreditamos na força da colaboração para promover a segurança. Oferecemos um espaço dedicado à colaboração, onde os membros da comunidade, autoridades locais e especialistas em segurança podem se unir para compartilhar conhecimentos, experiências e estratégias. A colaboração é a chave para fortalecer laços comunitários e implementar soluções inovadoras para desafios de segurança.

</p>
</div>

</div>


</div>

      
</>
);
};

export default Home;
