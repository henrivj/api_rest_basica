const inputId = document.getElementById('inputId');
const respostaConsultar = document.getElementById('respostaConsultar');

document.getElementById('botaoConsultar').addEventListener('click', (event) => {
	event.preventDefault();

	fetch(`http://localhost:3000/encomenda/${inputId.value}`, {
		method: 'GET'
	})
		.then((res) => res.json())
		.then((dados) => {
			respostaConsultar.innerHTML = `
            <tr>
                <td>${dados.id}</td>
                <td>${dados.carga}</td>
                <td>${dados.descricaoCarga}</td>
                <td>${dados.pesoKg}</td>
                <td>${dados.distanciaKm}</td>
                <td>${dados.prioridade}</td>
                <td>${dados.custo}</td>
            <tr>`;
		})
		.catch((error) => {
			console.error('Erro ao consultar encomenda: ', error);
			respostaConsultar.innerHTML = '<tr><td>Erro ao consultar encomenda</td></tr>'; // poe o erro como informacao da tabela
		});
});
