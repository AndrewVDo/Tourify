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

app.post('/register', async (req, res) => {
    console.log(req.body)
    let newUserRef = fb.collection('users').doc(`user-${req.body.uid}`)
    await newUserRef.set({
        alias: req.body.alias,
        //dateOfBirth: req.body.birthday, <- type needs to be enforced from frontend
        nationality: req.body.nationality,
        profilePicUrl: req.body.profilePicUrl,
        uid: req.body.uid,
        userType: req.body.userType,
        weight: req.body.weight
    })
    res.send('success')
})

app.post('/profileInfo', async (req, res) => {
    //let usersRef = fb.collection("users").where('uid', '==', `user-${req.body.uid}`)
    let userRef = fb.collection("users");
    let resDocument
    let queryRef = userRef.where('uid', '==', '6liodl1i0dQoPaDATMpT3a0qRnb2').get()
        .then(snapshot => {
            if (snapshot.empty){
                console.log("no matching docs");
                return;
            }
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                let docData = doc.data();
                resDocument = {
                    "alias" : docData.alias,
                    "dateOfBirth" : docData.dateOfBirth,
                    "name" : docData.name,
                    "nationality": docData.nationality,
                    "profilePicURL": docData.profilePicUrl,
                    "userType" : docData.userType,
                    "weight": docData.weight,
                }
                let test = "se";
            });
        })
        .catch(err => console.log(err))
    res.send(JSON.stringify(resDocument))
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)