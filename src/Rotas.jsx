import { Route, Routes } from "react-router-dom";
import Cadastro from "./views/register/Register";
import NotFound from "./views/NotFound";
import Home from "./views/home/Home";
import Ocorrencia from "./views/ocorrencias/Ocorrencia";
import Login from "./views/login/Login";
import Perfil from "./views/perfil/Perfil";
import GeoapifyMap from "./util/maps/GeoapifyMap";
import { ProtectedRoute } from "./util/ProtectedRoute";
import { LoggedInRouting } from "./util/LoggedInRouting";
import Comunidade from "./views/comunidade/Comunidade";
import FileUploader from "./util/FileUploader";
import DropZone from "./util/DropZone";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <LoggedInRouting>
              <Login />
            </LoggedInRouting>
          }
        />
        <Route
          path="cadastro"
          element={
            <LoggedInRouting>
              <Cadastro />
            </LoggedInRouting>
          }
        />
        <Route path="ocorrencia" element={<Ocorrencia />} />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route path="mapdemo" element={<GeoapifyMap />} />
        <Route path="comunidade" element={<Comunidade />} />
        <Route path="uploader" element={<DropZone />} />
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </>
  );
}

export default Rotas;
