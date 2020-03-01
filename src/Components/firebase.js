import firebase from "firebase";
import "firebase/auth";

//populate below from: https://console.firebase.google.com/
//suggest moving this config file to server side and fetching the resulting object so we can secure the api key!

var firebaseConfig = {
  apiKey: "AIzaSyA8F_DVnSrUA6sp6LAHILjeuyxDWas3PkA",
  authDomain: "tourify-ddf38.firebaseapp.com",
  databaseURL: "https://tourify-ddf38.firebaseio.com",
  projectId: "tourify-ddf38",
  storageBucket: "tourify-ddf38.appspot.com",
  messagingSenderId: "631113479804",
  appId: "1:631113479804:web:e84696981982ca3673bbf9"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const signInWithGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
export const signOut = () => auth.signOut();

export default firebase;
