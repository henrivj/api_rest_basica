const respostaListar = document.getElementById('respostaListar');

// nesse caso eu nao to usando o eventListener pq eu quero que assim que o usuario abra a pagina ele liste tudo, mas seria a mesma logica dos outros

fetch(`http://localhost:3000/encomendas/`, {
	method: 'GET'
})
	.then((res) => res.json())
	.then((dados) => {
		respostaListar.innerHTML = ''; // geralmente esse reset nao é nescessario, mas nesse caso precisa limpar pra poder listar todos
		dados.forEach((encomenda) => {
			// o forEach funciona quase como um loop for:
			// para cada encomenda no array dados, faca X
			// vai rodar 1 vez para cada encomenda
			respostaListar.innerHTML += `
                <tr>
                    <td>${encomenda.id}</td>
                    <td>${encomenda.carga}</td>
                    <td>${encomenda.descricaoCarga}</td>
                    <td>${encomenda.pesoKg}</td>
                    <td>${encomenda.distanciaKm}</td>
                    <td>${encomenda.prioridade}</td>
                    <td>${encomenda.custo}</td>
                <tr>`;
		});
	})
	.catch((error) => {
		console.error('Erro ao listar encomendas: ', error);
		respostaListar.innerHTML = '<tr><td>Erro ao listar encomendas</td></tr>';
	});
