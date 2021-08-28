const btnSearch = document.querySelector('button#btn-search');
const inputElement = document.querySelector('input#id');
const divResultado =  document.querySelector('div#resultado');

btnSearch.disabled = true;

inputElement.addEventListener('input', (event) => {
  let value = inputElement.value;

  value ? btnSearch.disabled = false : btnSearch.disabled = true;
})

btnSearch.onclick = () => {
  let codigo = inputElement.value; 

  axios.get(`http://localhost:3333/pedido/${codigo}`)
  .then((res) => {
    if(res) {
      let pedido = res.data;
      showPedido(pedido);
    }
  }).catch((err) => {
    let pedido = {
      nome: 'Erro',
      status: 'Pedido não encontrado.',
      localizacao: '-'
    }

    showPedido(pedido);
  });

  inputElement.value = '';
  btnSearch.disabled = true;
}

function showPedido(pedido) {
  divResultado.innerHTML = '';

  let nome = pedido.nome;
  let pNomeElement = document.createElement('h5');
  let pNomeText = document.createTextNode(`${nome}`);
  pNomeElement.appendChild(pNomeText);
  divResultado.appendChild(pNomeElement);

  let status = pedido.status;
  let pStatusElement = document.createElement('h5');
  let pStatusText = document.createTextNode(`Status: ${status}`);
  pStatusElement.appendChild(pStatusText);
  divResultado.appendChild(pStatusElement);

  let local = pedido.localizacao;
  let pLocalElement = document.createElement('h5');
  let pLocalText = document.createTextNode(`Localização: ${local}`);
  pLocalElement.appendChild(pLocalText);
  divResultado.appendChild(pLocalElement);
}


