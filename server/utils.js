const admin = require("firebase-admin");
const serviceAccount = require("../tourify-ddf38-firebase-adminsdk-y4uye-9666de5e0f.json")
const {firestore} = require('firebase-admin')

const firebaseConnect = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://tourify-ddf38.firebaseio.com"
    });

    return admin.firestore();
}

const stampBirthday = birthday => {
    return firestore.Timestamp.fromDate(new Date(birthday))
}

const age = birthday => {
    let bd = (new Date(birthday)).getTime() //this one returns seconds
    let td = (new Date()).getTime() //this one returning milliseconds, wtf?
    let x = Number(td - bd);
    console.log(bd, td)
    return x
}

const verifyLogin = async (idToken, authClient) => {
    const ticket = await authClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.CLIENT_ID
    })
    const payload = ticket.getPayload()
    console.log(payload)
    return payload.email_verified
}

module.exports = {firebaseConnect, age, stampBirthday, verifyLogin}