const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {firebaseConnect, age} = require('./utils.js')

const fb = firebaseConnect()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/profileInfo', async (req, res) => {
    let usersRef = fb.collection("users").doc(req.query.uid)
    let resDocument
    await usersRef.get()
        .then(doc => {
            let rawDocument = doc.data()
            resDocument = {
                alias: rawDocument.alias,
                weight: rawDocument.weight,
                userType: rawDocument.userType,
                profilePicUrl: rawDocument.profilePicUrl,
                age: age(rawDocument.dateOfBirth),
                nationality: rawDocument.nationality
            }
            console.log(resDocument)
        })
        .catch(err => console.log(err))
    res.send(JSON.stringify(resDocument))
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)