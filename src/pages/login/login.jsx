import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        try {
            const response = await axios.post('http://localhost:3000/usuarios/login', { email, senha });
            const usuario = response.data;

            // Salvar o id do usuário autenticado no localStorage
            localStorage.setItem('id_usuario', usuario.id_usuario);

            alert('Login bem-sucedido!');
            // Redirecionar para a página de usuários
            navigate('/home'); // Usando useNavigate para redirecionar
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErrorMessage('Usuário ou senha inválidos.'); // Definindo mensagem de erro
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#e9ecef' }}>
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#f8f9fa' }}>
                <h1 className="text-center mb-4">Login</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-3">Entrar</button>
                    <Link to="/cadastro" className="btn btn-primary w-100 mt-4">Cadastrar</Link>
                </form>
                <p className="text-center mt-3">
                    <a href="#">Esqueceu a senha?</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
