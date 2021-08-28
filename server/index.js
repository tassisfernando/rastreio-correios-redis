const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const redis = require('redis');

//configurando o redis e adicionando dados
const client = redis.createClient();

client.on('connect', () => { console.log('Redis connected') });

//adicionando registros no Redis: descomentar na primeira execução
//addData();

//criando a rota de acesso
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

//rota com hgetall: está sendo usado
app.get('/pedido/:key', (req, res) => {
  const key = req.params.key;
  client.hgetall(key, (err, reply) => {
    if(reply) {
      return res.status(200).json(reply);
    } 
    return res.status(404).json({ message: 'Pedido não encontrado.' }) ;
  });
});

app.listen(3333, () => console.log('Iniciado em http://localhost:3333'));

function addData() {
  client.hmset('123abc', {
    'nome': 'Panela anti-aderente',
    'status': 'Entregue',
    'localizacao': '-'
  });

  client.hmset('1a2b', {
    'nome': 'Livro Clean Code',
    'status': 'A caminho',
    'localizacao': 'Belo Horizonte-MG'
  });

  client.hmset('456def', {
    'nome': 'Teclado gamer',
    'status': 'A caminho',
    'localizacao': 'Cajamar-SP'
  });

  client.hmset('789xyz', {
    'nome': 'Fone sem fio',
    'status': 'A caminho',
    'localizacao': 'Ipatinga-MG'
  });

  client.hmset('aaa111', {
    'nome': 'Notebook',
    'status': 'A caminho',
    'localizacao': 'Brasília-DF'
  });

  client.hmset('qwer123', {
    'nome': 'Lâmpada',
    'status': 'A caminho',
    'localizacao': 'Pequim - China'
  });

  client.hmset('wasd123', {
    'nome': 'Monitor Acer',
    'status': 'A caminho',
    'localizacao': 'Unidade de Tratamento - BH'
  });
}