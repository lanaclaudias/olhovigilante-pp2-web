import { Route, Routes } from "react-router-dom";
import Cadastro from "./components/Login/Register/Register";
import NotFound from "./NotFound";
import Home from "./components/Home";
import Ocorrencia from "./Ocorrencia";
import Login from "./components/Login/Register/Login";
import Perfil from "./components/Perfil/Perfil";
import MapDemo from "./MapDemo";
import { ProtectedRoute } from "./util/ProtectedRoute";
import Comunidade from "./Comunidade";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="ocorrencia" element={<Ocorrencia />} />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        {/* <Route path="mapdemo" element={<MapDemo />} /> */}
        <Route path="comunidade" element={<Comunidade />} />
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </>
  );
}

export default Rotas;
