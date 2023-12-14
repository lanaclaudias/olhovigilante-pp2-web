import Header from "../../Header/Header";

function Login() {
  return (
    <>
      <Header />
      <div className="container flex flex-wrap mt-20 items-center">
        <div className="flex">
          <div
            className={`bg-[url(/Polygon.png)] bg-contain bg-no-repeat w-[600px] h-[600px] flex items-center justify-center text-center relative mb-[11px]`}
          >
            <div className="max-w-[100%] p-5 bg-white/70 rounded-lg text-center">
              <h1 className="text-black text-6xl mt-10 font-serif{ExtraBold} not-italic">
                OLHO VIGILANTE              </h1>
              <p className="text-black text-lg mt-6">
                Aqui, você pode compartilhar informações, conhecer seus
                vizinhos, sua cidade, e ajudar a tornar sua comunidade mais
                segura. Junte-se a nós !!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <form className="border-2 rounded-lg bg-white pl-6 pr-6 pt-5 w-96 shadow py-8">
            <h2 className="text-black text-center mb-[50px] font-semibold text-[36px]">
              LOGIN
            </h2>
            <label htmlFor="" className="block text-black font-bold">
              Email:
            </label>
            <input
              id={""}
              type={"email"}
              className="border rounded-6 p-3 w-full mb-4 text-black"
            />
            <label htmlFor="" className="block text-black font-bold">
              Senha:
            </label>
            <input
              id={""}
              type={"senha"}
              className="border rounded-6 p-3 w-full mb-4 text-black"
            />
            <button className="font-bold bg-blue-400 px-20 py-4 rounded-lg mt-3 hover-bg-red-600">
              Entrar
            </button>
          </form>
        </div>
        
      </div>
      <div className='h-[275px] text-white bg-black'>

  <div className='container flex gap-1 justify-between pt-20 text-[20px]'>

<div> 
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
<a href="/">
<p>
Inicio
</p></a>
<a href="/ocorrencia">
<p>
Ocorrências
</p></a>
<a href="/comunidade">
<p>
Comunidade
</p></a>
<a href="/denunciar">
<p>
Onde Denunciar
</p></a>

</div>
</div>


<div className='flex justify-center pt-10'>
<p className='text-white w-[599px] text-left text-[20px] mx-10px'>

© 2023  Olho Vigilante | Todos os direitos reservados.
</p>
</div>
</div>
    </>
  );
}

export default Login;
