import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Caixa() {
    const [produtos] = useState([
        {
            id_produto: 1,
            nome: 'Produto A',
            descricao: 'Descrição do Produto A',
            preco: 10.00,
            estoque: 50,
        },
        {
            id_produto: 2,
            nome: 'Produto B',
            descricao: 'Descrição do Produto B',
            preco: 20.00,
            estoque: 30,
        },
        {
            id_produto: 3,
            nome: 'Produto C',
            descricao: 'Descrição do Produto C',
            preco: 15.00,
            estoque: 20,
        },
    ]);

    const [carrinho, setCarrinho] = useState([]);
    const [quantidades, setQuantidades] = useState({});
    const [metodoPagamento, setMetodoPagamento] = useState('cartaoCredito');
    const [pesquisa, setPesquisa] = useState('');

    const adicionarAoCarrinho = (produto) => {
        const quantidade = quantidades[produto.id_produto] || 1;
        const itemExistente = carrinho.find(item => item.id_produto === produto.id_produto);

        if (itemExistente) {
            setCarrinho(
                carrinho.map(item =>
                    item.id_produto === produto.id_produto
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                )
            );
        } else {
            setCarrinho([...carrinho, { ...produto, quantidade }]);
        }
    };

    const removerDoCarrinho = (id_produto) => {
        const novoCarrinho = carrinho.filter(item => item.id_produto !== id_produto);
        setCarrinho(novoCarrinho);
    };

    const calcularTotal = () => {
        return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
    };

    const finalizarVenda = () => {
        alert(`Venda finalizada com sucesso!\nMétodo de Pagamento: ${metodoPagamento}\nItens:\n${carrinho.map(item => `${item.nome} - Quantidade: ${item.quantidade} - Total: R$ ${(item.preco * item.quantidade).toFixed(2)}`).join('\n')}\nValor Total: R$ ${calcularTotal()}`);
        setCarrinho([]);
        setMetodoPagamento('cartaoCredito');
        setQuantidades({});
        setPesquisa('');
    };

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className="container mt-5">
            {/* Botão Voltar com ícone de seta */}
            <Link to="/home" className="btn btn-secondary mt-1">
                <i className="fas fa-arrow-left"></i> Voltar
            </Link>

            <h1 className="mb-4 text-center">Caixa</h1>

            {/* Campo de pesquisa */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar produto..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
            </div>

            <div className="row">
                {/* Lista de Produtos */}
                <div className="col-md-7">
                    <h4 className="mb-4">Produtos</h4>
                    <div className="row">
                        {produtosFiltrados.length > 0 ? (
                            produtosFiltrados.map(produto => (
                                <div className="col-md-6 mb-3" key={produto.id_produto}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{produto.nome}</h5>
                                            <p className="card-text">{produto.descricao}</p>
                                            <p className="card-text">Preço: R$ {produto.preco.toFixed(2)}</p>
                                            <p className="card-text">Estoque: {produto.estoque}</p>
                                            <div className="d-flex">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantidades[produto.id_produto] || 1}
                                                    onChange={(e) => setQuantidades({
                                                        ...quantidades,
                                                        [produto.id_produto]: parseInt(e.target.value, 10),
                                                    })}
                                                    style={{ width: '60px' }}
                                                    className="form-control me-2"
                                                />
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => adicionarAoCarrinho(produto)}
                                                >
                                                    Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum produto encontrado.</p>
                        )}
                    </div>
                </div>

                {/* Carrinho de Compras */}
                <div className="col-md-5">
                    <h4 className="mb-4">Carrinho de Compras</h4>
                    {carrinho.length > 0 ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Qtd</th>
                                        <th>Preço</th>
                                        <th>Total</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrinho.map(item => (
                                        <tr key={item.id_produto}>
                                            <td>{item.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {item.preco.toFixed(2)}</td>
                                            <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" onClick={() => removerDoCarrinho(item.id_produto)}>
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h5>Total: R$ {calcularTotal()}</h5>

                            {/* Seleção de método de pagamento */}
                            <div className="mb-3">
                                <label htmlFor="metodoPagamento" className="form-label">Método de Pagamento:</label>
                                <select
                                    id="metodoPagamento"
                                    className="form-select"
                                    value={metodoPagamento}
                                    onChange={(e) => setMetodoPagamento(e.target.value)}
                                >
                                    <option value="cartaoCredito">Cartão de Crédito</option>
                                    <option value="cartaoDebito">Cartão de Débito</option>
                                    <option value="pix">Pix</option>
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="doc">DOC</option>
                                    <option value="ted">TED</option>
                                </select>
                            </div>

                            <button className="btn btn-success w-100" onClick={finalizarVenda}>
                                Finalizar Venda
                            </button>
                        </>
                    ) : (
                        <p>O carrinho está vazio.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Caixa;
