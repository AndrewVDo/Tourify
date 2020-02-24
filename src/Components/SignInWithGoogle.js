import React from "react";
import { signInWithGoogle } from "../firebase.js";
import GoogleButton from "react-google-button";

const SignInWithGoogle = () => {
  return(
    <GoogleButton onClick={signInWithGoogle} />
  )
}

export default SignInWithGoogle;
