const firebaseConnect = () => {
    const admin = require("firebase-admin");
    const serviceAccount = require("../tourify-ddf38-firebase-adminsdk-y4uye-9666de5e0f.json")

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://tourify-ddf38.firebaseio.com"
    });

    return admin.firestore();

    // Sample get from firebase
    // var usersRef = db.collection("users").doc("7QGMmUx1q51F3HqQTovL(test)")
    // let getDoc = usersRef.get()
    //     .then(doc => {
    //         console.log(doc.data())
    //     })
}

const age = birthday => {
    birthday = new Date(birthday);
    return new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
}

module.exports = {firebaseConnect, age}