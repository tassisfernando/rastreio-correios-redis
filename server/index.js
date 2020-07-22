const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');

//configurando o redis e adicionando dados
const client = redis.createClient();

client.on('connect', () => { console.log('Redis connected') });

client.hmset('123abc', {
  'status': 'Entregue',
  'localizacao': '-'
});

client.hmset('1a2b', {
  'status': 'A caminho',
  'localizacao': 'Belo Horizonte-MG'
});

client.hmset('456def', {
  'status': 'A caminho',
  'localizacao': 'Cajamar-SP'
});

client.hmset('789xyz', {
  'status': 'A caminho',
  'localizacao': 'Ipatinga-MG'
});

client.hmset('aaa111', {
  'status': 'A caminho',
  'localizacao': 'Brasília-DF'
});

client.hmset('qwer123', {
  'status': 'A caminho',
  'localizacao': 'Pequim - China'
});

client.hmset('wasd123', {
  'status': 'A caminho',
  'localizacao': 'Unidade de Tratamento - BH'
});

//criando a rota de acesso
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

//rota com get: não estou usando mais
app.get('/pedidos/:id', (req, res) => {
  const id = req.params.id;
  client.get(id, (err, reply) => {
    if(reply) {
      return res.json({ pedido: reply });
    } 
    return res.status(404).json({ message: 'Pedido não encontrado.' }); 
  });
});

//rota com hgetall: está sendo usado
app.get('/pedido/:key', (req, res) => {
  const key = req.params.key;
  client.hgetall(key, (err, reply) => {
    if(reply) {
      return res.json(reply);
    } 
    return res.status(404).json({ message: 'Pedido não encontrado.' }) ;
  });
})

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.listen(3333, () => console.log('Iniciado em http://localhost:3333'));

