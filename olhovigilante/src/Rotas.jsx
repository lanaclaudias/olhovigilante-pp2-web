import React from 'react';
import { Route, Routes } from "react-router-dom";

import Home from './Home';
import Login from './Login';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                {/*<Route path="sobre" element={ <Sobre/> } />*/}
                {/*<Route path="contato" element={ <Contato/> } />*/}
                <Route path="login" element={ <Login/> } />
            </Routes>
        </>
    )
}

export default Rotas