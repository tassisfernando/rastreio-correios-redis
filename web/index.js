const btnSearch = document.querySelector('button#btn-search');
const inputElement = document.querySelector('input#id');
const divResultado =  document.querySelector('div#resultado');

btnSearch.disabled = true;

inputElement.addEventListener('input', (event) => {
  var value = inputElement.value;

  value ? btnSearch.disabled = false : btnSearch.disabled = true;
})

btnSearch.onclick = () => {
  var codigo = inputElement.value; 

  axios.get(`http://localhost:3333/pedido/${codigo}`)
  .then((res) => {
    if(res) {
      var pedido = res.data;
      showPedido(pedido);
    }
  }).catch((err) => {
    var pedido = {
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

  var status = pedido.status;
  var pStatusElement = document.createElement('h5');
  var pStatusText = document.createTextNode(`Status: ${status}`);
  pStatusElement.appendChild(pStatusText);
  divResultado.appendChild(pStatusElement);

  var local = pedido.localizacao;
  var pLocalElement = document.createElement('h5');
  var pLocalText = document.createTextNode(`Localização: ${local}`);
  pLocalElement.appendChild(pLocalText);
  divResultado.appendChild(pLocalElement);
}


