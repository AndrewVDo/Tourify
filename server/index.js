const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/login', (req, resp) => {
  console.log(req.body.username)
  
  resp.send(JSON.stringify({ 
    result: 'success' 
  }))
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
