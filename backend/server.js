const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

//-------------------BANCO DE DADOS---------------\\

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dl111297',
  database: 'mytask'
});

// Conexão com o banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});
//-------------------BANCO DE DADOS---------------\\


// Middleware
app.use(cors());
app.use(bodyParser.json());

//-------------------FUNÇÕES LOGIN---------------\\


app.post('/login', (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ success: false, message: 'CPF e senha são obrigatórios' });
  }

  connection.query('SELECT * FROM usuario WHERE cpf = ?', [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).json({ success: false, message: 'Erro ao consultar o banco de dados' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'CPF ou senha incorretos' });
    }

    const user = results[0];

    // Verifica a senha diretamente (NÃO RECOMENDADO PARA PRODUÇÃO)
    if (senha !== user.senha) {
      return res.status(401).json({ success: false, message: 'CPF ou senha incorretos' });
    }

    res.json({
      success: true,
      user: {
        id: user.id_usuario,
        nome: user.nome,
        cpf: user.cpf,
        email: user.email,
      },
      token: 'dummy-token', // Em um cenário real, você geraria um token JWT aqui
    });
  });
});


//-------------------FUNÇÕES LOGIN---------------\\

//-------------------FUNÇÕES CADASTRO---------------\\
// Função para cadastro de novo usuário
app.post('/cadastrar-usuario', (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  // Verificar se o usuário já está cadastrado
  const checkQuery = 'SELECT * FROM usuario WHERE email = ? OR cpf = ?';
  connection.query(checkQuery, [email, cpf], (checkError, checkResults) => {
    if (checkError) {
      console.error('Erro ao verificar usuário:', checkError);
      res.status(500).send('Erro ao verificar usuário');
      return;
    }

    if (checkResults.length > 0) {
      res.status(409).send('Usuário já cadastrado');
      return;
    }

    // Inserir o novo usuário no banco de dados
    const insertQuery = 'INSERT INTO usuario (nome, cpf, email, senha) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [nome, cpf, email, senha], (insertError, insertResults) => {
      if (insertError) {
        console.error('Erro ao inserir usuário:', insertError);
        res.status(500).send('Erro ao cadastrar usuário');
        return;
      }
      console.log('Usuário cadastrado com sucesso:', insertResults);
      res.send('Usuário cadastrado com sucesso');
    });
  });
});

//-------------------FUNÇÕES CADASTRO---------------\\

//função para adição dos valores financeiros.

// Rota para adicionar lucro
app.post('/api/lucros', (req, res) => {
  console.log('Recebendo dados de lucro:', req.body); // Log dos dados recebidos
  const { id_usuario, valor, observacao, saldo_total, data_insercao } = req.body;
  const query = `INSERT INTO lucros (id_usuario, valor, observacao, saldo_total, data_insercao) VALUES (?, ?, ?, ?, ?)`;
  connection.query(query, [id_usuario, valor, observacao, saldo_total, data_insercao], (err, results) => {
    if (err) {
      console.error('Erro ao inserir lucro:', err);
      res.status(500).send('Erro ao inserir lucro');
      return;
    }
    res.status(200).send('Lucro inserido com sucesso');
  });
});

// Rota para adicionar gastos
app.post('/api/gastos', (req, res) => {
  console.log('Recebendo dados de gastos:', req.body); // Log dos dados recebidos
  const { id_usuario, valor, observacao, saldo_total, data_insercao } = req.body;
  const query = `INSERT INTO gastos (id_usuario, valor, observacao, saldo_total, data_insercao) VALUES (?, ?, ?, ?, ?)`;
  connection.query(query, [id_usuario, valor, observacao, saldo_total, data_insercao], (err, results) => {
    if (err) {
      console.error('Erro ao inserir gasto:', err);
      res.status(500).send('Erro ao inserir gasto');
      return;
    }
    res.status(200).send('Gasto inserido com sucesso');
  });
});

// Rota para obter todas as tarefas
app.get('/api/tarefas', (req, res) => {
  const sql = 'SELECT * FROM tarefa WHERE id_usuario = ?';
  const userId = 1; // Substitua pelo ID do usuário logado
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar as tarefas:', err);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar as tarefas' });
      return;
    }
    res.json(results);
  });
});

// Rota para adicionar uma nova tarefa
app.post('/api/tarefas', (req, res) => {
  const { id_usuario, observacao } = req.body;
  const sql = 'INSERT INTO tarefa (id_usuario, observacao) VALUES (?, ?)';
  connection.query(sql, [id_usuario, observacao], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar a tarefa:', err);
      res.status(500).json({ error: 'Erro interno do servidor ao adicionar a tarefa' });
      return;
    }
    res.status(201).json({ id_tarefa: result.insertId });
  });
});

// Rota para remover uma tarefa por ID
app.delete('/api/tarefas/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tarefa WHERE id_tarefa = ?';
  connection.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error('Erro ao remover a tarefa:', err);
      res.status(500).json({ error: 'Erro interno do servidor ao remover a tarefa' });
      return;
    }
    res.sendStatus(200);
  });
});


// Rota para obter o saldo financeiro do usuário
app.get('/api/saldo/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT 
      (COALESCE(SUM(lucros.valor), 0) - COALESCE(SUM(gastos.valor), 0)) AS saldo 
    FROM 
      usuario
      LEFT JOIN lucros ON usuario.id_usuario = lucros.id_usuario
      LEFT JOIN gastos ON usuario.id_usuario = gastos.id_usuario
    WHERE 
      usuario.id_usuario = ?
  `;
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o saldo financeiro:', err);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar o saldo financeiro' });
      return;
    }
    res.json({ saldo: results[0].saldo });
  });
});

// Rota para obter a quantidade de tarefas do usuário
app.get('/api/tarefas/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT COUNT(*) AS tarefasTotais FROM tarefa WHERE id_usuario = ?';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar as tarefas:', err);
      res.status(500).json({ error: 'Erro interno do servidor ao buscar as tarefas' });
      return;
    }
    res.json({ tarefasTotais: results[0].tarefasTotais });
  });
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
