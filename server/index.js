const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {firebaseConnect, age, stampBirthday, verifyLogin, getUserType} = require('./utils.js')
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
    let registeredCheckRef = firebaseClient.collection('users').doc(`user-${req.body.uid}`)

    try {
        if(!await verifyLogin(req.body.idToken, authClient)) {
            throw new Error('login not valid')
        }
        else if( !(await registeredCheckRef.get()).exists) {
            throw new Error('not registered yet')
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

app.get('/profile-info/:uid', async (req, res) => {
    let response = {
        success: false,
        msg: ''
    }
    let usersRef = firebaseClient.collection("users").doc(`user-${req.params.uid}`)

    let documentSnapShot = await usersRef.get()
    if(!documentSnapShot.exists) {
        response.success = false
        response.msg = 'failed to load'
        return res.json(response) 
    }
    try {
        let rawDocument = await documentSnapShot.data()
        response.data = {
            alias: rawDocument.alias,
            weight: rawDocument.weight,
            userType: rawDocument.userType,
            profilePicUrl: rawDocument.profilePicUrl,
            age: age(rawDocument.dateOfBirth),
            nationality: rawDocument.nationality
        }
        response.success = true
    }
    catch(err) {
        response.msg = err.toString()
    }
    res.json(response)
});

app.post('/events', async (req, res) => {
    let response = {
        success: false,
        msg: ''
    }
    try {
        let eventRef = await firebaseClient.collection("events").get();
        response.events = eventRef.docs.map(doc => {
            let data = {
                "event_id": doc.id,
                ...doc.data()
            }
            return data;
        });
        response.success = true;
        response.userType = await getUserType(req.body.uid, firebaseClient)
    }
    catch(err) {
        response.error = true
    }
    res.json(response)
});

app.put('/update-profile-info', async (req, res)=>{
    try {
        let userRef = firebaseClient.collection("users").doc(`user-${req.body.uid}`)
        let updateData = {
            alias : req.body.name,
            weight : req.body.weight,
            dateOfBirth : req.body.age,
            nationality : req.body.nationality
        };
        await userRef.update(updateData);
        res.json({success: true});
    } catch(err) {
        console.error(err)
    }
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)
