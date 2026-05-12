const inputId = document.getElementById('inputId');
const respostaDeletar = document.getElementById('respostaDeletar');

document.getElementById('botaoDeletar').addEventListener('click', (event) => {
	event.preventDefault();

	fetch(`http://localhost:3000/encomenda/${inputId.value}`, {
		method: 'DELETE'
	})
		.then((res) => res.json())
		.then((dados) => {
			respostaDeletar.innerHTML = `<p>${dados.message}</p>`;
		})
		.catch((error) => {
			console.error('Erro ao deletar encomenda: ', error);
			respostaDeletar.innerHTML = '<p>Erro ao deletar encomenda</p>';
		});
});
