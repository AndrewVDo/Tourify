import React, {useState, useEffect} from "react";
import { signInWithGoogle } from "./firebase.js";
import GoogleButton from "react-google-button";

const SignInWithGoogleButton = () => {
  useEffect(() => {
    let buttonList = document.getElementsByClassName('googleSignInButton')
    for(let button of buttonList) {
      button.addEventListener('click', async () => {
        console.log(await signInWithGoogle())
      })
    }
  })

  return(
    <GoogleButton className='googleSignInButton'/>
  )
}

export default SignInWithGoogleButton;
