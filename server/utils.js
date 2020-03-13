const admin = require("firebase-admin");
//console.log('typeof sdk: ', typeof process.env.firebase_admin_sdk)
const serviceAccount = {
    type: process.env.admin_sdk_type,
    project_id: process.env.admin_sdk_project_id,
    private_kay_id: process.env.admin_sdk_private_key_id,
    private_key: process.env.admin_sdk_private_key,
    client_email: process.env.admin_sdk_client_email,
    client_id: process.env.admin_sdk_client_id,
    auth_uri: process.env.admin_sdk_auth_uri,
    token_uri: process.env.admin_sdk_token_uri,
    auth_provider_x509_cert_url: process.env.admin_sdk_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.admin_sdk_client_x509_cert_url
}
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
    birthday = new Date(birthday);
    return Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
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