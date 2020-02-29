const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { Client } = require('pg')

/*const client = new Client('postgres://localhost'/*{
  connectionString: process.env.PG_URL,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true
}*///)
//client.connect()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

/*app.get('/test', async (req, res) => {
  console.log(client)
  let x
  await client.query('select * from users').then(res=> x=res.rows[0]).catch(err => console.log(err))
  res.send(JSON.stringify({x: x}))
})

/*app.post('/login', async (req, resp) => {
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
  console.log(req.body)
  let answer

  if(await findUsername(req.body.username, client) !== 0) {
    answer = {
      status: false,
      message: 'User already exists'
    }
  } else {
    if(req.body.password !== req.body.confirmPassword) {
      answer = {
        status: false,
        message: 'Passwords do not match'
      }
    } else {
      answer = {
        status: true
      }

      await client
        .query(`insert into users(username, password) values('${req.body.username}', '${await hashPassword(req.body.password)}')`)

    }
  }

  console.log(answer)
  resp.send(JSON.stringify(answer))
})
*/
app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

/*var verifyLogin = async (username, password, db) => {
  let loginVerified = false

  await db
    .query(`select * from users where users.username = '${username}'`)
    .then(async (res) => {
      loginVerified = (res.rows.length === 1 && res.rows[0].username === username && await bcrypt.compare(password, res.rows[0].password)) ? true : false
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
    .then(res => found = (res.rows.length === 1 && res.rows[0].username === username) ? 1 : 0)
    .catch(err => console.log(err))

  return found
}*/