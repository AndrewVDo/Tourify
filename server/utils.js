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
    let bd = (new Date(birthday)).getTime()
    let td = (new Date()).getTime()
    return Number(td - bd);
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

const getUserType = async (uid, firebaseClient) => {
    let userRef = firebaseClient.collection('users').doc(`user-${uid}`)
    let docSnapshot = await userRef.get()

    if(!docSnapshot) {
        throw new Error("can't find user")
    }

    return docSnapshot.data().userType
}

module.exports = {firebaseConnect, age, stampBirthday, verifyLogin, getUserType}
