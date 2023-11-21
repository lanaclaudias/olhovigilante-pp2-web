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

const tiposOcorrencia = [
  "AMEA&Ccedil;A",
  "ATO / ESCRITO / OBJETO OBSCENO",
  "APROPRIA&Ccedil;&Atilde;O IND&Eacute;BITA",
  "DANO / DEPREDA&Ccedil;&Atilde;O",
  "ESTELIONATO / FRAUDE",
  "POSSE / INVAS&Atilde;O DE PROPRIEDADE",
  "CONSTRANGIMENTO ILEGAL",
  "VIOLA&Ccedil;&Atilde;O DE DOMIC&Iacute;LIO",
  "PERTURBA&Ccedil;&Atilde;O DO SOSSEGO / TRANQUILIDADE P&Uacute;BLICA",
  "DESACATO",
  "DEIXAR DE ENTREGAR NOTA FISCAL",
  "FAZER COBRAN&Ccedil;A DE DIVIDAS DE MANEIRA AMEA&Ccedil;ADORA",
  "FALSA IDENTIDADE / FALSIDADE IDEOL&Oacute;GICA ",
  "ACIDENTE DE TR&Acirc;NSITO SEM V&Iacute;TIMA",
  "EXTRAVIO",
  "OUTRAS OCORR&Ecirc;NCIAS N&Atilde;O CRIMINAIS",
  "CRIMES CONTRA AS RELA&Ccedil;&Otilde;ES DE CONSUMO",
  "CRIMES CONTRA O SENTIMENTO RELIGIOSO E RESPEITO AOS MORTOS",
  "EXERC&Iacute;CIO ILEGAL DA MEDICINA, ARTE DENT&Aacute;RIA OU FARMAC&Ecirc;UTICA",
  "CRUELDADE CONTRA ANIMAIS",
  "EXERC&Iacute;CIO ARBITR&Aacute;RIO DAS PR&Oacute;PRIAS RAZ&Otilde;ES",
  "VIAS DE FATO",
  "RIXA",
  "CAL&Uacute;NIA",
  "DIFAMA&Ccedil;&Atilde;O",
  "DESENTENDIMENTO/DISCUSS&Atilde;O",
  "ASS&Eacute;DIO SEXUAL",
  "INJURIA QUALIFICADA RACIAL",
  "ROUBO COM RESTRI&Ccedil;&Atilde;O DA LIBERDADE DA V&Iacute;TIMA",
  "ROUBO A TRANSEUNTE",
  "ROUBO A &Ocirc;NIBUS",
  "ROUBO A OUTROS TRANSPORTES COLETIVOS",
  "ROUBO EM RESID&Ecirc;NCIA",
  "ROUBO EM ESTABELECIMENTO COMERCIAL OU DE SERVI&Ccedil;OS",
  "ROUBO A OUTRAS INSTITUI&Ccedil;&Otilde;ES FINANCEIRAS",
  "ROUBO (SA&Iacute;DA DE BANCO/INSTITUI&Ccedil;&Atilde;O FINANCEIRA)",
  "OUTROS ROUBOS",
  "FURTO A TRANSEUNTE",
  "FURTO EM RESID&Ecirc;NCIA",
  "FURTO EM ESTABELECIMENTO COMERCIAL OU DE SERVI&Ccedil;OS",
  "FURTO A OUTRAS INSTITUI&Ccedil;&Otilde;ES FINANCEIRAS",
  "FURTO (SA&Iacute;DA DE BANCO/INSTITUI&Ccedil;&Atilde;O FINANCEIRA)",
  "OUTROS FURTOS",
  "AMEA&Ccedil;A POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "APROPRIA&Ccedil;&Atilde;O DE BENS/RENDIMENTOS DE PESSOA IDOSA",
  "CAL&Uacute;NIA POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "COA&Ccedil;&Atilde;O DE IDOSO DOAR CONTRATAR, TESTAR, OUTORGAR PROCURA&Ccedil;&Atilde;O",
  "CONSTRANGIMENTO ILEGAL POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "DISCRIMINA&Ccedil;&Atilde;O DE PESSOA IDOSA",
  "INDUZIMENTO DE IDOSO SEM DISCERNIMENTO A OUTORGAR PROCURA&Ccedil;&Atilde;O",
  "INJ&Uacute;RIA POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "PERTURBA&Ccedil;&Atilde;O DO SOSSEGO POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "OMISS&Atilde;O DE ASSIST&Ecirc;NCIA A PESSOA IDOSA",
  "RETEN&Ccedil;&Atilde;O DE DOCUMENTO DE PESSOA IDOSA",
  "DIFEREN&Ccedil;A DE FLUXO  CAIXA EM INST. FIN. OU TRANSP DE VALORES",
  "INVAS&Atilde;O DE DISPOSITIVO INFORM&Aacute;TICO",
  "C&Aacute;RCERE PRIVADO POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "DESCUMPRIMENTO DE MEDIDA PROTETIVA DE URG&Ecirc;NCIA",
  "DIFAMA&Ccedil;&Atilde;O POR VIOL&Ecirc;NCIA DOM&Eacute;STICA/FAMILIAR",
  "INJURIA"
]

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
      </div>
    </main>
  );
};

export default RegistrarOcorrencia;
