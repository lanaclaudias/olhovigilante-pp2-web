import "./index.css"; // Certifique-se de importar o arquivo CSS correspondente
import Rotas from "./Rotas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Rotas />
    </>
  );
}

export default App;
