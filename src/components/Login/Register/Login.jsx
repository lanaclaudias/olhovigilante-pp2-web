import Logo from '../../../assets/Polygon.png.png';
import Header from '../../Header/Header';

function Login() {
  return (
    <>
      <Header></Header>
      <div className="flex justify-center mt-20 items-center">
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: `url('${Logo}')`,
              backgroundSize: 'contain', // Use 'contain' para dimensionar a imagem de fundo dentro do contêiner
              backgroundRepeat: 'no-repeat',
              width: '600px',
              height: '600px',
              marginLeft: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
              marginBottom:'10px'
            }}
          >
            <div
              style={{
                maxWidth: '100%', // Defina a largura máxima para o contêiner do texto
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h1 className="text-black text-6xl mt-10 font-serif{ExtraBold} not-italic">
                Olho vigilante
              </h1>
              <p className="text-black text-lg mt-6">
                Aqui, você pode compartilhar informações, conhecer seus vizinhos, sua cidade,
                e ajudar a tornar sua comunidade mais segura. Junte-se a nós!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <form className="border-2 rounded-lg bg-white pl-6 pr-6 pt-5 w-96 shadow py-8">
            <h2 style={{ color: 'black', textAlign: 'center', marginBottom: '50px', fontFamily: 'SemiBold', fontSize: '36px' }}> Login</h2>
            <label htmlFor="" className="block text-black font-bold">
              email
            </label>
            <input
              id={''}
              type={'email'}
              className="border rounded-6 p-3 w-full mb-4 text-black"
            />
            <label htmlFor="" className="block text-black font-bold">
              Senha
            </label>
            <input
              id={''}
              type={'senha'}
              className="border rounded-6 p-3 w-full mb-4 text-black"
            />
            <button className="font-bold bg-blue-400 px-20 py-4 rounded-lg mt-3 hover-bg-red-600">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
