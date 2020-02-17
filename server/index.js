const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client('postgres://localhost')
client.connect()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/login', async (req, resp) => {
  let answer

  if(await verifyLogin(req.body.username, req.body.password, client)) {
    answer = {
      status: true
    }
  } else {
    answer = {
      status: false,
      message: 'Invalid Username/Password'
    }
  }

  resp.send(JSON.stringify(answer))
})

app.post('/register', async (req, resp) => {
  let answer

  if(await findUsername(req.body.username, client) !== 0) {
    answer = {
      status: false,
      error: 'User already exists'
    }
  } else {
    if(req.body.password !== req.body.confirmPassword) {
      answer = {
        status: false,
        error: 'Passwords do not match'
      }
    } else {
      answer = {
        status: true
      }
    }
  }

  resp.send(JSON.stringify(answer))
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

var verifyLogin = async (username, password, db) => {
  let loginVerified = false

  await db
    .query(`select * from users where users.username = '${username}'`)
    .then(async (res) => {
        console.log(res.rows[0].username)
        loginVerified = (res.rows[0].username === username && res.rows[0].password === await hashPassword(password)) ? true : false
    })
    .catch(err => {
      console.log(err)
    })

  return loginVerified
}

var hashPassword = async (password) => {
  let saltRounds = 10
  let hashedPassword = ''
  await bcrypt.genSalt(saltRounds)
    .then(async (salt) => {
      await bcrypt.hash(password, salt)
        .then((hash) => {
          hashedPassword = hash
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
  return hashedPassword
}

var findUsername = async (username, db) => {
  //found
  //  -1: error
  //   0: not found
  //   1: found
  let found = -1

  await db
    .query(`select * from users where users.username = '${username}'`)
    .then(res => found = (res.rows[0].username === username) ? 1 : 0)
    .catch(err => console.log(err))

  return found
}