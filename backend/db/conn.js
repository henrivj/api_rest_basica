const { Sequelize } = require('sequelize');

const db = new Sequelize('encomenda_db', 'root', '0406', {
	dialect: 'mysql', // mysql2 é o pacote do node (npm install mysql2), aqui usa normal
	host: 'localhost',
	port: 3306 // endereço do banco
});

module.exports = db;
