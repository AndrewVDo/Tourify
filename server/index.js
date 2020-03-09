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
    let resDocument = {
        "alias": "placeholder",
        "dateOfBirth" : "placeholder",
        "nationality": "placeholder",
        "profilePicURL": "placeholder",
        "userType" : "placeholder",
        "weight" : 0}
    await userRef.where('uid', '==', req.body.uid).get()
        .then(snapshot => {
            if (snapshot.empty){
                console.log("no matching docs");
                return;
            }
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());
                let docData = doc.data();
                resDocument.alias = docData.alias;
                resDocument.dateOfBirth = docData.dateOfBirth;
                resDocument.nationality = docData.nationality;
                resDocument.profilePicURL = docData.profilePicUrl;
                resDocument.userType = docData.userType;
                resDocument.weight = docData.weight;
            });
        })
        .catch(err => console.log(err))
    res.send(JSON.stringify(resDocument))
});

app.post('/updateProfileInfo', async (req, res)=>{
    let userRef = fb.collection("users");
    let riderInfo = userRef.doc(`user-${req.body.uid}`)
    let updateData = {
        alias : req.body.name,
        weight : req.body.weight,
        age : req.body.age,
        nationality : req.body.nationality
    };

    //console.log(req.body.name)

    await fb.collection("users").doc(`user-${req.body.uid}`).update(updateData);
        //.catch(err => console.log(`ERROR OCCURED ${err}`))
        res.send("Success!");
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)