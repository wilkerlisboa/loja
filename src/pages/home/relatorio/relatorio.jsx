import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Relatorio = () => {
    const [usuarios, setUsuarios] = useState(null);
    const [estoque, setEstoque] = useState(null);
    const [vendas, setVendas] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const [usuariosResponse, estoqueResponse, vendasResponse] = await Promise.all([
                fetch('http://localhost:3000/produtos/usuarios'),
                fetch('http://localhost:3000/produtos/estoque'),
                fetch('http://localhost:3000/vendas/detalhes')
            ]);

            const usuariosText = await usuariosResponse.text();
            const estoqueText = await estoqueResponse.text();
            const vendasText = await vendasResponse.text();

            if (!usuariosResponse.ok || !estoqueResponse.ok || !vendasResponse.ok) {
                console.error('Erro nas respostas do servidor:', {
                    usuarios: usuariosText,
                    estoque: estoqueText,
                    vendas: vendasText
                });
                throw new Error('Falha ao obter dados de um ou mais endpoints');
            }

            setUsuarios(JSON.parse(usuariosText));
            setEstoque(JSON.parse(estoqueText));
            setVendas(JSON.parse(vendasText));
        } catch (error) {
            console.error('Erro ao buscar dados do servidor:', error);
            setError('Erro ao carregar os dados. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePrint = (tableId) => {
        const printContent = document.getElementById(tableId).innerHTML;
        printContentInNewWindow(printContent);
    };

    const printContentInNewWindow = (content) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Imprimir Tabela</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />');
        printWindow.document.write('</head><body>');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.onload = () => printWindow.print();
    };

    const totalProdutosCadastrados = usuarios ? usuarios.length : 0;
    const totalProdutosEstoque = estoque ? estoque.reduce((acc, item) => acc + item.quantidade, 0) : 0;
    const totalVendas = vendas ? vendas.reduce((acc, venda) => acc + venda.quantidade, 0) : 0;
    const totalValorVendas = vendas ? vendas.reduce((acc, venda) => acc + parseFloat(venda.preco_total), 0).toFixed(2) : "0.00";

    return (
        <div className="container my-4">
            <Link to="/home" className="btn btn-secondary mb-4">
                <i className="fas fa-arrow-left"></i> Voltar
            </Link>

            <h1 className="mb-4 text-center"><i className="fas fa-file-alt"></i> Relatório</h1>

            <div className='text-center mt-5'>
                <button className="btn btn-primary mb-3" onClick={() => handlePrint('usuariosTable')}>
                    <i className="fas fa-print"></i> Imprimir Cadastro de Produtos
                </button>
            
                <button className="btn btn-primary mb-3 ms-2" onClick={() => handlePrint('estoqueTable')}>
                    <i className="fas fa-print"></i> Imprimir Produtos no Estoque
                </button>

                <button className="btn btn-primary mb-3 ms-2" onClick={() => handlePrint('vendasTable')}>
                    <i className="fas fa-print"></i> Imprimir Vendas do Dia
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-around text-center mt-5">
                <div>
                    <h4><i className="fas fa-box"></i></h4>
                    <h4>Total de Produtos<br/>Cadastrados</h4>
                    <h4>{totalProdutosCadastrados}</h4>
                </div>
                <div>
                    <h4><i className="fas fa-warehouse"></i></h4>
                    <h4>Total de Produtos<br/>em Estoque</h4>
                    <h4>{totalProdutosEstoque}</h4>
                </div>
                <div>
                    <h4><i className="fas fa-shopping-cart"></i></h4>
                    <h4>Quantidade Total de Vendas<br/>do Dia</h4>
                    <h4>{totalVendas}</h4>
                </div>
                <div>
                    <h4><i className="fas fa-dollar-sign"></i></h4>
                    <h4>Total Vendido<br/>em Reais</h4>
                    <h4>R$ {totalValorVendas}</h4>
                </div>
            </div>

            <h5 className="mt-5 mb-3">Cadastro de Produtos</h5>
            {usuarios ? (
                <div id="usuariosTable">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID Produto</th>
                                <th>Nome do Produto</th>
                                <th>Nome do Usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id_produto}>
                                    <td>{usuario.id_produto}</td>
                                    <td>{usuario.nome_produto}</td>
                                    <td>{usuario.nome_usuario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info">Carregando usuários...</div>
            )}

            <h5 className="mt-5 mb-3">Produtos no Estoque</h5>
            {estoque ? (
                <div id="estoqueTable">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID Produto</th>
                                <th>Nome do Produto</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estoque.map((produto) => (
                                <tr key={produto.id_produto}>
                                    <td>{produto.id_produto}</td>
                                    <td>{produto.nome_produto}</td>
                                    <td>{produto.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info">Carregando produtos no estoque...</div>
            )}

            <h5 className="mt-5 mb-3">Vendas do Dia</h5>
            {vendas ? (
                <div id="vendasTable">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID Venda</th>
                                <th>Nome do Produto</th>
                                <th>Quantidade</th>
                                <th>Preço Unitário</th>
                                <th>Preço Total</th>
                                <th>Nome do Usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((venda) => (
                                <tr key={venda.id_venda}>
                                    <td>{venda.id_venda}</td>
                                    <td>{venda.nome_produto}</td>
                                    <td>{venda.quantidade}</td>
                                    <td>R$ {parseFloat(venda.preco_unitario).toFixed(2)}</td>
                                    <td>R$ {parseFloat(venda.preco_total).toFixed(2)}</td>
                                    <td>{venda.nome_usuario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-info">Carregando vendas...</div>
            )}
        </div>
    );
};

export default Relatorio;
