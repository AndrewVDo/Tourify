import firebase from "firebase/app";
import "firebase/auth";

//populate below from: https://console.firebase.google.com/
//populate firbase api

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const signInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
export const signOut = () => auth.signOut();

export default firebase;
