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
    let response = {
        success: false,
        error: false,
        msg: ''
    }
    try {
        if(!await verifyLogin(req.body.idToken, authClient)) {
            throw new Error('login not valid')
        }
        else {
            response.success = true
        }
    }
    catch(err) {
        response.error = true
        response.msg = err.toString
    }
    res.send(JSON.stringify(response))
})

app.post('/register', async (req, res) => {
    let response = {
        success: false,
        error: false,
        msg: ''
    }
    let newUserRef = firebaseClient.collection('users').doc(`user-${req.body.uid}`)

    try {
        if(!await verifyLogin(req.body.idToken, authClient)) {
            throw new Error('login not verified')
        }
        else if((await newUserRef.get()).exists) {
            throw new Error('user already exists')
        }
        else {
            //might not need to send this timeStamp to client
            let timeReceipt = await newUserRef.set({
                alias: req.body.alias,
                dateOfBirth: stampBirthday(req.body.dateOfBirth),
                nationality: req.body.nationality,
                profilePicUrl: req.body.profilePicUrl,
                uid: req.body.uid,
                userType: req.body.userType,
                weight: req.body.weight
            })
            console.log(timeReceipt)
            response.success = true
        }
    }
    catch(err) {
        response.error = true
        response.msg = err.toString()
    }
    res.send(JSON.stringify(response))
})

app.post('/profileInfo', async (req, res) => {
    let response = {
        success: false,
        error: false,
        msg: ''
    }
    let usersRef = firebaseClient.collection("users").doc(req.query.uid)

    let documentSnapShot = await usersRef.get()
    if(documentSnapShot.exists) {
        try {
            let rawDocument = documentSnapShot.data()
            response.resDocument = {
                alias: rawDocument.alias,
                weight: rawDocument.weight,
                userType: rawDocument.userType,
                profilePicUrl: rawDocument.profilePicUrl,
                age: age(rawDocument.dateOfirebaseClientirth),
                nationality: rawDocument.nationality
            }
            response.success = true
        }
        catch(err) {
            response.error = true
            response.msg = err.toString()
        }
    }
    res.send(JSON.stringify(response))
});

app.get('/EventsList', async (req, res) => {
    let response = {
        success: false,
        error: false,
        msg: ''
    }
    try {
        let eventRef = await firebaseClient.collection("events").get();
        response.events = eventRef.docs.map(doc => doc.data());
        response.success = true;
    }
    catch(err) {
        response.error = true
        response.msg = err.toString()
    }
    res.send(JSON.stringify(response))
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)