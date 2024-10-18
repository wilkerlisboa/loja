import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Usuarios() {
    const [usuario, setUsuario] = useState(null); // Alterado para null inicialmente
    const [loading, setLoading] = useState(true); // Estado de carregamento

    // Função para buscar os dados do usuário autenticado
    const buscarUsuario = async () => {
        const id_usuario = localStorage.getItem('id_usuario');

        if (id_usuario) {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/${id_usuario}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                alert('Erro ao carregar as informações do usuário.');
            } finally {
                setLoading(false); // Atualiza o estado de carregamento
            }
        } else {
            alert('Usuário não autenticado.');
            window.location.href = '/login';
        }
    };

    // UseEffect para buscar o usuário quando o componente é montado
    useEffect(() => {
        buscarUsuario();
    }, []);

    const imprimirInformacoes = () => {
        window.print();
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: '#e9ecef' }}>
            <h1 className="mb-4"><i className="fas fa-user"></i> Usuários</h1>
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#f8f9fa' }}>
                {loading ? ( // Mostra carregando se o estado de loading estiver verdadeiro
                    <p>Carregando informações do usuário...</p>
                ) : (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Nome:</label>
                            <p>{usuario?.nome || 'Não disponível'}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CPF:</label>
                            <p>{usuario?.cpf || 'Não disponível'}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">RG:</label>
                            <p>{usuario?.rg || 'Não disponível'}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Endereço:</label>
                            <p>{usuario?.endereco || 'Não disponível'}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <p>{usuario?.email || 'Não disponível'}</p>
                        </div>
                        <button onClick={imprimirInformacoes} className="btn btn-primary w-100 mt-3">Imprimir Informações</button>
                        <Link to = '/home' className="btn btn-secondary w-100 mt-2">
                            <i className="fas fa-arrow-left"></i> Voltar
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Usuarios;
