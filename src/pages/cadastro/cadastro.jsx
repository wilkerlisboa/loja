import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, cpf, rg, endereco, email, senha }), // Enviando dados do formulário
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Cadastro bem-sucedido:', data);
                
                // Redireciona para a página de login após o cadastro
                navigate('/'); 
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            setErrorMessage('Erro ao fazer cadastro. Tente novamente mais tarde.');
        }
    };

    return (
        <div 
            className="d-flex align-items-center justify-content-center vh-100" 
            style={{ backgroundColor: '#e9ecef' }}
        >
            <div 
                className="card shadow p-4" 
                style={{ width: '100%', maxWidth: '500px', backgroundColor: '#f8f9fa' }} // Largura ajustada
            >
                <h1 className="text-center mb-4">Cadastro</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            placeholder="Digite seu CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)} // Atualiza o estado do CPF
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rg" className="form-label">RG</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rg"
                            placeholder="Digite seu RG"
                            value={rg}
                            onChange={(e) => setRg(e.target.value)} // Atualiza o estado do RG
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endereco" className="form-label">Endereço</label>
                        <input
                            type="text"
                            className="form-control"
                            id="endereco"
                            placeholder="Digite seu endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)} // Atualiza o estado do endereço
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-3">Cadastrar</button>
                    <p className="text-center mt-3">
                        <Link to='/'>Voltar para Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
