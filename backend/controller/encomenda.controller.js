const Encomenda = require('../model/Encomenda');

const cadastrar = async (req, res) => {
	const prioridade = req.body.prioridade;
	const pesoKg = req.body.pesoKg;
	const distanciaKm = req.body.distanciaKm;

	// logica do custo baseado na prioridade (provavelmente nao vai mudar muito disso na prova, so com outro 'tema')
	let custo;
	if (prioridade === 'normal') custo = pesoKg * distanciaKm * 0.5 + 50;
	else if (prioridade === 'rapida') custo = pesoKg * distanciaKm * 0.7 + 100;
	else if (prioridade === 'imediata') custo = pesoKg * distanciaKm * 0.12 + 200;

	// aqui a gente anexa o custo aos valores que vem do front
	const valores = {
		carga: req.body.carga,
		descricaoCarga: req.body.descricaoCarga,
		pesoKg: pesoKg,
		distanciaKm: distanciaKm,
		prioridade: prioridade,
		custo: custo
	};
	// caso todos os valores nescessarios viessem do front nao precisaria disso (no caso se nao calculasse custo)
	// acho dificil do carlos nao pedir isso na prova, mas caso aconteca:
	// trocaria a linha 28 por 'Await Encomenda.create(req.body)'

	try {
		await Encomenda.create(valores);
		res.status(201).json({ message: 'Encomenda cadastrada com sucesso' });
	} catch (error) {
		console.error('Erro ao cadastrar encomenda: ', error);
		res.status(500).json({ message: 'Erro ao cadastrar encomenda' });
	}
};

const consultar = async (req, res) => {
	const id = req.params.id; // pega o /:id da rota

	try {
		const encomenda = await Encomenda.findByPk(id);
		// ou const encomenda = await Encomenda.findOne({ where: { id: id } });
		// o findByPk procura direto pela chave primaria
		// o findOne pega a 1a encomenda com o id: id (que no caso sempre so vai ter 1, ja que definimos como autoincrement no model)

		if (!encomenda) return res.status(404).json({ message: 'Encomenda não encontrada' });
		// se nao achar a encomenda retorna 404
		// PRECISA do return se nao ele vai tentar mandar o 201 logo abaixo, o return faz ele parar de rodar ali

		res.status(200).json(encomenda);
	} catch (error) {
		console.error('Erro ao consultar encomenda: ', error);
		res.status(500).json({ message: 'Erro ao consultar encomenda' });
	}
};

const listar = async (req, res) => {
	try {
		const encomendas = await Encomenda.findAll(); // retorna um array com todas as encomendas (se nao tiver nenhuma ele nao da erro, so retorna um array vazio, o que nao chega a ser errado)
		res.status(200).json(encomendas);
	} catch (error) {
		console.error('Erro ao listar encomendas: ', error);
		res.status(500).json({ message: 'Erro ao listar encomendas' });
	}
};

const deletar = async (req, res) => {
	const id = req.params.id;
	try {
		const encomenda = await Encomenda.findByPk(id); // busca primeiro
		if (!encomenda) return res.status(404).json({ message: 'Encomenda não encontrada' });

		await encomenda.destroy(); // deleta a encomenda encontrada
		res.status(200).json({ message: 'Encomenda deletada com sucesso' });
	} catch (error) {
		console.error('Erro ao deletar encomenda: ', error);
		res.status(500).json({ message: 'Erro ao deletar encomenda' });
	}
};

module.exports = { cadastrar, consultar, listar, deletar };
