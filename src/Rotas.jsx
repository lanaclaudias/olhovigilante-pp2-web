import { Route, Routes } from "react-router-dom";

import Cadastro from "./Cadastro";
import Login from "./Login";
import NotFound from "./NotFound";
import Home from "./components/Home";

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
