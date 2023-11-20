import Header from "./components/Header/Header";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <Header />
        <h1 className="text-red-600 self-center">Página não encontrada</h1>
      </div>
    </>
  );
};

export default NotFound;
