// import React, { useState } from 'react';

// const RegistrarOcorrencia = ({ showModal, hideModal }) => {
//   const [tipoOcorrencia, setTipoOcorrencia] = useState();
//   const [descricao, setDescricao] = useState();
//   const [cidade, setCidade] = useState();
//   const [bairro, setBairro] = useState();
//   const [data, setData] = useState();
//   const [hora, setHora] = useState();
//   const [midia, setMidia] = useState();
//   const [geolocalizacao, setGeolocalizacao] = useState('');
//   const [usuarioId, setUsuarioId] = useState();
//   const [categoriaId, setCategoriaId] = useState();

//   const fields = [
//     {
//       label: 'Tipo de Ocorrência',
//       type: 'select',
//       handleChange: (e) => setCategoriaId(e.target.value),
//     },
//     {
//       label: 'Descrição',
//       type: 'textarea',
//       placeholder:
//         'Descrição base e informações adicionais como presença policial, ação policial, motivação, quantidade de vítimas, etc.',
//       handleChange: (e) => setDescricao(e.target.value),
//     },
//     {
//       label: 'Cidade',
//       type: 'text',
//       handleChange: (e) => setCidade(e.target.value),
//     },
//     {
//       label: 'Bairro',
//       type: 'text',
//       handleChange: (e) => setBairro(e.target.value),
//     },
//     {
//       label: 'Data',
//       type: 'date',
//       handleChange: (e) => setData(e.target.value),
//     },
//     {
//       label: 'Hora',
//       type: 'time',
//       handleChange: (e) => setHora(e.target.value),
//     },
//     {
//       label: 'Midia',
//       type: 'file',
//       handleChange: (e) => setMidia(e.target.value),
//     }, // implementação apropriada para múltiplos arquivos pendente e necessita integrar com a API de Mídia já configurada com suas associações
//     {
//       label: 'Geolocalização',
//       type: 'text',
//       handleChange: (e) => setGeolocalizacao(e.target.value),
//     }, // aguardando a integração com a API do Google Maps
//     {
//       label:
//         'ID do Usuário (campo temporário pela falta de implementação de login)',
//       type: 'text',
//       handleChange: (e) => setUsuarioId(parseInt(e.target.value)),
//     }, // campo temporário até a implementação do login de usuário
//   ];

//   return (
//     <>
//       {showModal ? (
//         <>
//           <form
//             className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//             onSubmit={handleSubmit}
//           >
//             <div className="relative min-w-[550px] my-6 mx-auto max-w-3xl">
//               {/*content*/}
//               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 <h1 className="text-black font-sora text-[24px] font-bold text-center pt-4">
//                   NOVA OCORRÊNCIA
//                 </h1>
//                 <div className="relative p-6 flex-auto">
//                   {fields.map(({ label, type, values, handleChange }) => (
//                     <div key={label}>
//                       <label className="block text-black font-bold">
//                         {label}
//                       </label>
//                       {type === 'textarea' ? (
//                         <textarea
//                           placeholder={label}
//                           onChange={handleChange}
//                           className="border rounded-[6px] p-3 w-full mb-4 text-black"
//                         />
//                       ) : type === 'radio' ? (
//                         <div className="flex">
//                           {values.map((value, index) => (
//                             <div key={index} className="mr-4">
//                               <input
//                                 type={type}
//                                 value={value}
//                                 name={label}
//                                 onChange={handleChange}
//                                 className="mr-1"
//                               />
//                               <label htmlFor={value} className="text-black">
//                                 {value}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       ) : type === 'file' ? (
//                         <input
//                           type="file"
//                           onChange={handleChange}
//                           className="border rounded-[6px] p-3 w-full mb-4 text-black"
//                         />
//                       ) : type === 'select' ? (
//                         <TipoOcorrenciaSelect
//                           lista={tipoOcorrenciaLista}
//                           className="border rounded-[6px] p-3 w-full mb-4 text-black"
//                           handleChange={handleChange}
//                         />
//                       ) : (
//                         <input
//                           type={type}
//                           placeholder={label}
//                           onChange={handleChange}
//                           className="border rounded-[6px] p-3 w-full mb-4 text-black"
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 {/*footer*/}
//                 <div className="flex gap-[20px] items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b text-white">
//                   <button
//                     className="font-bold px-[52px] py-[12px] rounded-lg mt-3 bg-red-600"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     FECHAR
//                   </button>
//                   <button
//                     className="font-bold bg-blue-400 px-[52px] py-[12px] rounded-lg mt-3"
//                     type="submit"
//                     /*onClick={() => {
//                   salvar();
//                   setShowModal(false);
//                 }}*/
//                   >
//                     SALVAR
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// };

// export default RegistrarOcorrencia;
