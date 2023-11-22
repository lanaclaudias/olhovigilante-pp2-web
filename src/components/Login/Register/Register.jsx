//<script src="http://localhost:8097"></script>
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import cepPromise from "cep-promise";
import Header from "../../Header/Header";

const Register = () => {
  const [nome, setNome] = useState();
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();
  const [senha, setSenha] = useState();
  const [confirmaSenha, setConfirmaSenha] = useState();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const bairroRef = useRef(null);
  const cidadeRef = useRef(null);

  /*useEffect(() => {
    if (cep && cep.length == 8) {
      cepPromise(cep)
        .then((data) => {
          setBairro(data.neighborhood);
          setCidade(data.city);          
        })
        .catch((err) => {
          err.errors.map((e) => {
            alert(e.message);
          });
        });
    }
  });*/

  const fields = [
    {
      label: "NOME *",
      type: "text",
      placeholder: "Digite o seu nome",
      required: true,
      handleChange: (e) => setNome(e.target.value),
    },
    {
      label: "CEP",
      type: "text",
      placeholder: "Digite o seu cep",
      maxlength: 8,
      handleChange: (e) => {
        //const currentCidade = e.target.value;
        //if(currentCidade && currentCidade.length === 8) {
        //  console.log(currentCidade)
        //}
        //cidadeRef.current.value = e.target.value.length;
        setCep(e.target.value);
        //setBairro("hey")
      },
      handleBlur: (e) => {
        cepPromise(cep)
          .then((data) => {
            bairroRef.current.value = data.neighborhood;
            cidadeRef.current.value = data.city;
            setBairro(bairroRef.current.value);
            setCidade(cidadeRef.current.value);
          })
          .catch((err) => {
            console.log(err);
            bairroRef.current.value = "CEP Vazio ou Inválido";
            cidadeRef.current.value = "";
            setBairro(bairroRef.current.value);
            setCidade(cidadeRef.current.value);
            /*err.errors.map((e) => {
              //console.log(e.message);
            });*/
          });
      },
    },
    {
      label: "CIDADE",
      type: "text",
      placeholder: "",
      ref: cidadeRef,
      disabled: true,
      //handleChange: (e) => {},
    },
    {
      label: "BAIRRO",
      type: "text",
      placeholder: "",
      ref: bairroRef,
      disabled: true,
      //handleChange: (e) => setBairro(e.target.value),
    },
    {
      label: "EMAIL",
      type: "email",
      placeholder: "Digite o seu email",
      required: true,
      handleChange: (e) => setEmail(e.target.value),
    },
    {
      label: "CPF",
      type: "text",
      placeholder: "***.***.**-**",
      required: true,
      maxlength: 11,
      handleChange: (e) => setCpf(e.target.value),
    },
    {
      label: "SENHA",
      type: "password",
      placeholder: "Crie uma senha",
      required: true,
      handleChange: (e) => setSenha(e.target.value),
    },
    {
      label: "CONFIRME SUA SENHA",
      type: "password",
      placeholder: "Confirme sua senha",
      required: true,
      handleChange: (e) => setConfirmaSenha(e.target.value),
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    salvar();
  }

  function salvar() {
    const usuarioRequest = {
      nome: nome,
      //  cep: cep,
      cidade: cidade,
      bairro: bairro,
      email: email,
      cpf: cpf,
      senha: senha,
      confirmaSenha: confirmaSenha,
    };
    console.log(usuarioRequest);
    if (senha != confirmaSenha) {
      alert("A senha e a confirmação não são iguais.");
    } else {
      axios
        .post("http://localhost:8082/api/usuario", usuarioRequest)
        .then(
          //(res) => console.log("Usuário cadastrado com sucesso.")
          (r) => alert("Usuário cadastrado com sucesso.")
        )
        .catch(
          //(err) => console.log("Erro ao cadastrar usuário.")
          (e) => alert("Falha ao cadastrar.\n" + e.name + " - " + e.message)
        );
    }
  }

  return (
    <>
      <Header />
      <main className="flex container justify-center mx-auto mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black  pt-[20px]">
            Cadastre-se
          </h1>
          <p className="text-slate-500 w-[230px] text-[18px]">
            Mantenha-se informado sobre a sua região.
          </p>
          <form
            className="flex flex-col mt-[12px] border-2 rounded-lg bg-white pl-[46px] pr-[38px] pt-[45px] w-[540px] shadow py-[32px]"
            onSubmit={handleSubmit}
          >
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
                  maxLength={field.maxlength}
                  ref={field.ref}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  className="border rounded-[6px] p-3 w-full mb-4 text-black"
                />
              </div>
            ))}
            <div className="">
              <input
                className="inline-block mr-2"
                id="termos"
                type="checkbox"
                required
              />
              <label htmlFor="termos" className="text-black">
                Eu concordo com os{" "}
                <a href="/tos" className="text-blue-400 underline">
                  termos de serviço
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="font-bold bg-blue-400 px-[52px] py-[12px] rounded-lg mt-3 hover:bg-red-600"
            >
              CADASTRAR
            </button>
          </form>
          <p className="flex justify-center text-black mt-5 gap-1">
            Já tem uma conta?
            <a href="/login" className="text-blue-400 underline">
              entre aqui.
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
