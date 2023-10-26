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

const Register = () => {
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
            CADASTRAR
          </button>
        </form>
        <p className="flex justify-center text-black mt-5 gap-1">
          Já tem uma conta?
          <a href="" className="text-blue-400 underline">
            entre aqui.
          </a>
        </p>
      </div>
    </main>
  );
};

export default Register;
