import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Estoque() {
    // Estado para armazenar a lista de produtos com quantidade
    const [produtos, setProdutos] = useState([
        { id: 1, nome: 'Produto 1', quantidade: 5 },
        { id: 2, nome: 'Produto 2', quantidade: 3 },
        { id: 3, nome: 'Produto 3', quantidade: 10 },
        { id: 4, nome: 'Produto 4', quantidade: 8 },
        { id: 5, nome: 'Produto 5', quantidade: 2 },
        { id: 6, nome: 'Produto 6', quantidade: 6 },
        { id: 7, nome: 'Produto 7', quantidade: 0 },
        { id: 8, nome: 'Produto 8', quantidade: 1 },
        { id: 9, nome: 'Produto 9', quantidade: 4 },
        { id: 10, nome: 'Produto 10', quantidade: 7 },
        { id: 11, nome: 'Produto 11', quantidade: 9 },
        // Adicione mais produtos conforme necessário
    ]);

    // Estado para gerenciar a página atual
    const [pagina, setPagina] = useState(1);
    const produtosPorPagina = 10;
    const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

    // Função para excluir um produto
    const excluirProduto = (id) => {
        const produtosFiltrados = produtos.filter(produto => produto.id !== id);
        setProdutos(produtosFiltrados);
    };

    // Paginação
    const produtosAtuais = produtos.slice((pagina - 1) * produtosPorPagina, pagina * produtosPorPagina);

    return (
        <div className="container">
            {/* Botão Voltar com ícone de seta */}
            <Link to="/home" className="btn btn-secondary mt-1">
                <i className="fas fa-arrow-left"></i> Voltar
            </Link>
            <h1 className="mb-5 text-center">Estoque</h1>
            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {produtosAtuais.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.quantidade}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => excluirProduto(produto.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginação */}
            <nav aria-label="Page navigation" className="mt-4">
                <ul className="pagination justify-content-center">
                    {[...Array(totalPaginas)].map((_, index) => (
                        <li key={index} className={`page-item ${pagina === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setPagina(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Estoque;
