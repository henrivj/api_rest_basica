const inputCarga = document.getElementById('inputCarga');
const inputDescricaoCarga = document.getElementById('inputDescricaoCarga');
const inputPesoCarga = document.getElementById('inputPeso');
const inputDistanciaCarga = document.getElementById('inputDistancia');
const inputPrioridade = document.getElementById('inputPrioridade');
const respostaCadastrar = document.getElementById('respostaCadastrar');

document.getElementById('botaoCadastrar').addEventListener('click', (event) => {
	event.preventDefault(); // previne o comportamento padrao do <form> (que é atualizar a pagina)

	const valores = {
		carga: inputCarga.value,
		descricaoCarga: inputDescricaoCarga.value,
		pesoKg: inputPesoCarga.value,
		distanciaKm: inputDistanciaCarga.value,
		prioridade: inputPrioridade.value
	};

	fetch('http://localhost:3000/encomenda', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }, // diz que o conteudo que esta sendo enviado é em JSON, carlos deixou anotar esse
		body: JSON.stringify(valores)
	})
		.then((res) => res.json()) // transforma a resposta do banco em json (vira o dados logo abaixo)
		.then((dados) => {
			respostaCadastrar.innerHTML = `<p>${dados.message}</p>`;
		})
		.catch((error) => {
			console.error('Erro ao cadastrar encomenda: ', error);
			respostaCadastrar.innerHTML = '<p>Erro ao cadastrar encomenda</p>';
		});
});
