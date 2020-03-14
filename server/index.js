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

app.post('/login', async (req, res) => {
    let response = {
        success: false,
        msg: ''
    }
    try {
        if(!await verifyLogin(req.body.idToken, authClient)) {
            throw new Error('login not valid')
        }
        response.success = true
    }
    catch(err) {
        response.msg = err.toString
    }
    res.json(response)
})

app.post('/register', async (req, res) => {
    let response = {
        success: false,
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
        response.success = true
    }
    catch(err) {
        response.msg = err.toString()
    }
    res.json(response)
})

app.post('/profile-info', async (req, res) => {
    let response = {
        success: false,
        msg: ''
    }
    let usersRef = firebaseClient.collection("users").doc(`user-${req.body.uid}`)

    let documentSnapShot = await usersRef.get()
    if(!documentSnapShot.exists) {
        response.success = false
        response.msg = 'failed to load'
        return res.json(response) 
    }
    try {
        let rawDocument = documentSnapShot.data()
        response.resDocument = {
            alias: rawDocument.alias,
            weight: rawDocument.weight,
            userType: rawDocument.userType,
            profilePicUrl: rawDocument.profilePicUrl,
            age: age(rawDocument.dateOfBirth._seconds),
            nationality: rawDocument.nationality
        }
        response.success = true
    }
    catch(err) {
        response.msg = err.toString()
    }
    console.log(response);
    res.json(response)
});

app.put('/update-profile-info', async (req, res)=>{
    let userRef = firebaseClient.collection("users");
    let riderInfo = userRef.doc(`user-${req.body.uid}`)
    let updateData = {
        alias : req.body.name,
        weight : req.body.weight,
        age : req.body.age,
        nationality : req.body.nationality
    };

    await riderInfo.update(updateData);
        //.catch(err => console.log(`ERROR OCCURED ${err}`))
    console.log(updateData)
    res.send({success: true});
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)
