import { Route, Routes } from 'react-router-dom';

import Cadastro from './components/Login/Register/Register';
import NotFound from './NotFound';
import Home from './components/Home';
import Ocorrencia from './Ocorrencia';
import Login from './components/Login/Register/Login';
import Perfil from './components/Perfil/Perfil';

function Rotas() {
  return (
    <>
      <Routes>
        {/*<Route path="sobre" element={ <Sobre/> } />*/}
        {/*<Route path="contato" element={ <Contato/> } />*/}
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="ocorrencia" element={<Ocorrencia />} />
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
=======
        <Route path="perfil" element={<Perfil />} />
>>>>>>> 87b708dfcb3552e5b986c8d8b0d91783ed2c24d6
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </>
  );
}

export default Rotas;
