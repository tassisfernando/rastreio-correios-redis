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
      var pedido = res.data.pedido;
      showPedido(pedido);
    }
  }).catch((err) => {
    alert("Pedido não encontrado!");
    var pedido = 'Pedido não encontrado.';
    showPedido(pedido);
  });

  inputElement.value = '';
}

function showPedido(pedido) {
  divResultado.innerHTML = '';

  var status = pedido;
  var pElement = document.createElement('p');
  var pText = document.createTextNode(status);

  pElement.appendChild(pText);
  divResultado.appendChild(pElement);
}


