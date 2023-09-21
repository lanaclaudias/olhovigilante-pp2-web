import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Cadastro from './Cadastro';
import NotFound from './NotFound';

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="sobre" element={ <Sobre/> } />*/}
        {/*<Route path="contato" element={ <Contato/> } />*/}
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </>
  );
}

export default Rotas;
