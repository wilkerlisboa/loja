const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configurar a conexão com o banco de dados MySQL usando pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'loja',
});

// Middleware para permitir requisições JSON e habilitar o CORS
app.use(cors());
app.use(express.json());

// Função auxiliar para verificar se o resultado é um array
const ensureArray = (data) => Array.isArray(data) ? data : [];

// Rota para autenticação de usuários (login)
app.post('/usuarios/login', (req, res) => {
    const { email, senha } = req.body;

    pool.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ message: 'Erro ao buscar usuário.' });
        }

        const users = ensureArray(results);
        if (users.length > 0) {
            res.status(200).json(users[0]); // Retorna o primeiro usuário encontrado
        } else {
            res.status(400).json({ message: 'Usuário ou senha inválidos' });
        }
    });
});

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
    pool.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).json({ message: 'Erro ao buscar usuários.' });
        }
        res.json(ensureArray(results));
    });
});

// Rota para buscar um usuário específico pelo ID
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ message: 'Erro ao buscar usuário.' });
        }

        const users = ensureArray(results);
        if (users.length > 0) {
            res.status(200).json(users[0]); // Retorna o usuário encontrado
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    });
});

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, cpf, rg, endereco, email, senha } = req.body;

    pool.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar e-mail:', err);
            return res.status(500).json({ message: 'Erro ao verificar e-mail.' });
        }

        const users = ensureArray(results);
        if (users.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        pool.query(
            'INSERT INTO usuarios (nome, cpf, rg, endereco, email, senha) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, cpf, rg, endereco, email, senha],
            (err, results) => {
                if (err) {
                    console.error('Erro ao adicionar usuário:', err);
                    return res.status(500).json({ message: 'Erro ao adicionar usuário.' });
                }
                res.status(201).json({ message: 'Usuário adicionado com sucesso.', id: results.insertId });
            }
        );
    });
});

// Rotas para produtos
app.get('/produtos', (req, res) => {
    pool.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
        res.json(ensureArray(results));
    });
});

app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;
    pool.query(
        'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, estoque],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar produto:', err);
                return res.status(500).json({ message: 'Erro ao adicionar produto.' });
            }
            res.status(201).json({ message: 'Produto adicionado com sucesso.', id: results.insertId });
        }
    );
});

// Rota para listar todas as vendas com informações do produto e do usuário
app.get('/vendas/detalhes', (req, res) => {
    const sql = `
        SELECT 
            v.id_venda AS id_venda,
            p.nome AS nome_produto,
            v.quantidade,
            p.preco AS preco_unitario,
            (v.quantidade * p.preco) AS preco_total,
            u.nome AS nome_usuario,
            v.data_venda AS data_venda
        FROM 
            vendas v
        JOIN 
            produtos p ON v.id_produto = p.id_produto
        JOIN 
            usuarios u ON v.id_usuario = u.id_usuario;
    `;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar vendas:', err);
            return res.status(500).json({ message: 'Erro ao buscar vendas.' });
        }
        res.json(ensureArray(results));
    });
});

// Rota para listar produtos e suas quantidades
app.get('/produtos/estoque', (req, res) => {
    const sql = `
        SELECT 
            p.id_produto AS id_produto,
            p.nome AS nome_produto,
            p.estoque AS quantidade,
            p.data_cadastro AS data_cadastro
        FROM 
            produtos p;
    `;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            return res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
        res.json(ensureArray(results));
    });
});

// Rota para listar produtos e usuários associados
app.get('/produtos/usuarios', (req, res) => {
    const sql = `
        SELECT 
            p.id_produto AS id_produto,
            p.nome AS nome_produto,
            u.nome AS nome_usuario,
            p.data_cadastro AS data_cadastro
        FROM 
            produtos p
        JOIN 
            usuarios u ON p.id_usuario = u.id_usuario;
    `;
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos e usuários:', err);
            return res.status(500).json({ message: 'Erro ao buscar produtos e usuários.' });
        }
        res.json(ensureArray(results));
    });
});

// Rota para buscar todas as vendas
app.get('/vendas', (req, res) => {
    pool.query('SELECT * FROM vendas', (err, results) => {
        if (err) {
            console.error('Erro ao buscar vendas:', err);
            return res.status(500).json({ message: 'Erro ao buscar vendas.' });
        }
        res.json(ensureArray(results));
    });
});

app.post('/vendas', (req, res) => {
    const { id_usuario, id_produto, quantidade, total } = req.body;
    pool.query(
        'INSERT INTO vendas (id_usuario, id_produto, quantidade, total) VALUES (?, ?, ?, ?)',
        [id_usuario, id_produto, quantidade, total],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar venda:', err);
                return res.status(500).json({ message: 'Erro ao adicionar venda.' });
            }
            res.status(201).json({ message: 'Venda adicionada com sucesso.', id: results.insertId });
        }
    );
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
