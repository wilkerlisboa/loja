import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './src/pages/login/login';
import Cadastro from './src/pages/cadastro/cadastro';
import Caixa from './src/pages/home/caixa/caixa';
import Estoque from './src/pages/home/estoque/estoque';
import Produto from './src/pages/home/produto/produto';
import Relatorio from './src/pages/home/relatorio/relatorio';
import Usuarios from './src/pages/home/usuarios/usuarios';
import Home from './src/pages/home/home';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota para a página de login */}
                <Route path="/" element={<Login />} />

                {/* Rota para a página de cadastro */}
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Rota para a página home */}
                <Route path="/home" element={<Home />} />

                {/* Rota para a página de caixa */}
                <Route path="/caixa" element={<Caixa />} />

                {/* Rota para a página de estoque */}
                <Route path="/estoque" element={<Estoque />} />

                {/* Rota para a página de produtos */}
                <Route path="/produto" element={<Produto />} />

                {/* Rota para a página de relatórios */}
                <Route path="/relatorio" element={<Relatorio />} />

                {/* Rota para a página de usuários */}
                <Route path="/usuarios" element={<Usuarios />} />

                {/* Rota para qualquer outra página que não seja encontrada */}
                <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
