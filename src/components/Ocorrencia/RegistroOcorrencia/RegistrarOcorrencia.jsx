import { useState } from "react";

const fields = [
  {
    label: "NOME",
    type: "text",
    placeholder: "Digite o seu nome",
    required: true,
  },
  { label: "CEP", type: "text", placeholder: "Digite o seu cep" },
  { label: "CIDADE", type: "text", placeholder: "", disabled: true },
  { label: "BAIRRO", type: "text", placeholder: "", disabled: true },
  {
    label: "EMAIL",
    type: "email",
    placeholder: "Digite o seu email",
    required: true,
  },
  { label: "CPF", type: "text", placeholder: "***.***.**-**", required: true },
  {
    label: "SENHA",
    type: "password",
    placeholder: "Crie uma senha",
    required: true,
  },
  {
    label: "CONFIRME SUA SENHA",
    type: "password",
    placeholder: "Confirme sua senha",
    required: true,
  },
];

const RegistrarOcorrencia = () => {
  const [nome, setNome] = useState();
  const [cep, setCep] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();
  const [senha, setSenha] = useState();
  const [confirmaSenha, setConfirmaSenha] = useState();

  return (
    <main className="flex justify-center mx-auto mb-8">
      <div>
        <h1 className="text-2xl font-bold text-black  pt-[20px]">
          Cadastre-se
        </h1>
        <p className="text-slate-500 w-[230px] text-[18px]">
          Mantenha-se informado sobre a sua região.
        </p>
        <form className="mt-[12px] border-2 rounded-lg bg-white pl-[46px] pr-[38px] pt-[45px] w-[540px] shadow py-[32px]">
          {fields.map((field, index) => (
            <div key={index}>
              <label
                htmlFor={field.label}
                className="block text-black font-bold"
              >
                {field.label}
              </label>
              <input
                id={field.label}
                disabled={field.disabled}
                required={field.required}
                type={field.type}
                placeholder={field.placeholder}
                className="border rounded-[6px] p-3 w-full mb-4 text-black"
              />
            </div>
          ))}
          <div className="flex gap-2">
            <input id="termos" type="checkbox" placeholder="oii" />
            <label htmlFor="termos" className="text-black">
              Eu concordo com os{" "}
              <a href="" className="text-blue-400 underline">
                termos de serviço
              </a>
            </label>
          </div>
          <button className="font-bold bg-blue-400 px-[52px] py-[12px] rounded-lg mt-3 hover:bg-red-600">
            REGISTRAR
          </button>
        </form>
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
    </main>
  );
};

export default RegistrarOcorrencia;
