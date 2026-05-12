const express = require('express');
const cors = require('cors');
const conn = require('./db/conn');
const app = express();

const encomendaController = require('./controller/encomenda.controller');

const hostname = 'localhost';
const PORT = 3000; // endereco da api

// middleware
// isso é so decorar (acho que o middleware ele deixou anotar na verdade mas tem que ver)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// rotas
// o nome da rota pode ser o mesmo (aqui tem dois /encomendas) desde que o metodo seja diferent (no caso post e get)
app.get('/encomendas', encomendaController.listar);
app.get('/encomenda/:id', encomendaController.consultar);
app.post('/encomenda', encomendaController.cadastrar);
app.delete('/encomenda/:id', encomendaController.deletar);

// rota padrao
app.get('/', (req, res) => {
	res.status(200).json({ message: 'API rodando!' });
});

// server (conecta com o banco)
conn
	.sync()
	.then(() => {
		app.listen(PORT, hostname, () => {
			console.log(`API rodando em: http://${hostname}:${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Erro ao iniciar a API: ', error);
	});
