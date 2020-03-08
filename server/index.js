const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {firebaseConnect, age, stampBirthday, verifyLogin} = require('./utils.js')
const {OAuth2Client} = require('google-auth-library');

const firebaseClient = firebaseConnect()
const authClient = new OAuth2Client(process.env.CLIENT_ID)
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(pino);

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/login', async (req, res) => {
    try {
        let uid = await verifyLogin(req.body.idToken, authClient)
        console.log('uid: ', uid)
    }
    catch(err) {
        console.error('err: ', err)
    }
})

app.post('/register', async (req, res) => {
    let result
    let newUserRef = firebaseClient.collection('users').doc(`user-${req.body.uid}`)

    try {
        let uid = await verifyLogin(req.body.idToken, authClient)
        console.log('uid: ', uid)
        if((await newUserRef.get()).exists) {
            throw new Error('user already exists')
        }
        else {
            //might not need to send this timeStamp to client
            result = await newUserRef.set({
                alias: req.body.alias,
                dateOfirebaseClientirth: stampBirthday(req.body.dateOfirebaseClientirth),
                nationality: req.body.nationality,
                profilePicUrl: req.body.profilePicUrl,
                uid: req.body.uid,
                userType: req.body.userType,
                weight: req.body.weight
            })
        }
    }
    catch(err) {
        console.log('err: ', err)
    }

    console.log(result)
    res.send(JSON.stringify(result))
})

app.post('/profileInfo', async (req, res) => {
    let usersRef = firebaseClient.collection("users").doc(req.query.uid)
    let resDocument

    let documentSnapShot = await usersRef.get()
    if(documentSnapShot.exists) {
        try {
            let rawDocument = documentSnapShot.data()
            resDocument = {
                alias: rawDocument.alias,
                weight: rawDocument.weight,
                userType: rawDocument.userType,
                profilePicUrl: rawDocument.profilePicUrl,
                age: age(rawDocument.dateOfirebaseClientirth),
                nationality: rawDocument.nationality
            }
        }
        catch(err) {
            console.err('err: ', err)
        }
    }
    res.send(JSON.stringify(resDocument))
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)