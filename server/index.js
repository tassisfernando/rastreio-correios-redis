const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');

//configurando o redis e adicionando dados
const client = redis.createClient();

client.on('connect', () => { console.log('Redis connected') });

client.set('total', '1800');
client.set('pedido1', 'entregue');

client.hmset('teste', ["1", "2"], (err, res) => {
  err ? console.log('Erro: ', err.message) : console.log();
});

//criando a rota de acesso
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'X-Requested-With');
  next();
})

app.get('/pedido/:id', (req, res) => {
  const id = req.params.id;
  client.get(id, (err, reply) => {
    if(reply) {
      return res.json({ pedido: reply });
    } 
    return res.status(404).json({ message: 'Pedido não encontrado.' })  
  });
});

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.listen(3333, () => console.log('Iniciado em http://localhost:3333'));
