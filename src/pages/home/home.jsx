import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: '#e9ecef' }}>
            <h1 className="mb-4">Início</h1>
            <p className="text-center mb-4">Bem-vindo à Euro Norte!<br />Selecione uma opção abaixo:</p>
            <div className="d-flex flex-column align-items-center">
                {/* Botões de Navegação */}
                <div className="d-flex flex-wrap justify-content-center">
                    {/* Botão Caixa */}
                    <Link to='/caixa' className="btn btn-primary m-2 p-3" style={{ width: '150px' }}>
                        <i className="fas fa-cash-register"></i> Caixa
                    </Link>
                    {/* Botão Estoque */}
                    <Link to='/estoque' className="btn btn-secondary m-2 p-3" style={{ width: '150px' }}>
                        <i className="fas fa-box"></i> Estoque
                    </Link>
                    {/* Botão Produto */}
                    <Link to='/produto' className="btn btn-success m-2 p-3" style={{ width: '150px' }}>
                        <i className="fas fa-tags"></i> Produto
                    </Link>
                    {/* Botão Relatório */}
                    <Link to='/relatorio' className="btn btn-info m-2 p-3" style={{ width: '150px' }}>
                        <i className="fas fa-chart-line"></i> Relatório
                    </Link>
                    {/* Botão Usuários */}
                    <Link to='/usuarios' className="btn btn-warning m-2 p-3" style={{ width: '150px' }}>
                        <i className="fas fa-users"></i> Usuários
                    </Link>
                </div>
                {/* Botão Voltar com ícone de seta */}
                <Link to='/' className="btn btn-secondary m-2 p-3" style={{ width: '150px' }}>
                    <i className="fas fa-arrow-left"></i> Voltar
                </Link>
            </div>
        </div>
    );
}

export default Home;
