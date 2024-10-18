import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Produto() {
    // Estado para gerenciar os dados do produto
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        quantidade: '',
        preco: '',
    });

    // Função para lidar com a mudança de valores nos campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados ao servidor ou ao banco de dados
        console.log('Produto cadastrado:', produto);
        // Limpar os campos após o envio
        setProduto({
            nome: '',
            descricao: '',
            quantidade: '',
            preco: '',
        });
    };

    return (
        <div className="container mt-5">
            {/* Botão Voltar com ícone de seta */}
            <Link to="/home" className="btn btn-secondary mb-4">
                <i className="fas fa-arrow-left"></i> Voltar
            </Link>
            <h1 className="mb-4">Cadastrar Produto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome do Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        placeholder="Digite o nome do produto"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <textarea
                        className="form-control"
                        id="descricao"
                        name="descricao"
                        placeholder="Descreva o produto"
                        value={produto.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantidade" className="form-label">Quantidade</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantidade"
                        name="quantidade"
                        placeholder="Digite a quantidade"
                        value={produto.quantidade}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="preco" className="form-label">Preço</label>
                    <input
                        type="number"
                        className="form-control"
                        id="preco"
                        name="preco"
                        placeholder="Digite o preço"
                        value={produto.preco}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-4">Cadastrar Produto</button>
                </div>
            </form>
        </div>
    );
}

export default Produto;
