const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { Client } = require('pg')

//const client = new Client('postgres://localhost')

//AT url for postgres cuz... dunno iz weird.
const client = new Client('postgres://at:301248624@localhost/postgres')

client.connect()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

//placeholder code. adjust where to recieve request username

app.get('/getProfile', async (req, resp) => {
  let answer
  let desired_username = req.query.username;
  await client
      .query(`select * from users where users.username ='${desired_username}';`)
      .then(async (res)=> {
          answer = res.rows[0];
      })
      .catch()

  //console.log(answer);
  resp.setHeader('Content-Type', 'application/json');
  resp.send(JSON.stringify(answer));
});

app.post('/profileInfo', async (req, resp) => {
    console.log(req);
})