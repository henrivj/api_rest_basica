const { DataTypes } = require('sequelize');
const db = require('../db/conn');

// define a tabela no banco de dados
const Encomenda = db.define('encomendas', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true, // faz com que o 1o seja id: 1, segundo id: 2, etc
		primaryKey: true
	},
	carga: {
		type: DataTypes.STRING,
		allowNull: false
	},
	descricaoCarga: {
		type: DataTypes.STRING,
		allowNull: false
	},
	pesoKg: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	distanciaKm: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	prioridade: {
		type: DataTypes.STRING,
		allowNull: false
	},
	custo: {
		type: DataTypes.FLOAT,
		allowNull: false
	}
});

module.exports = Encomenda;
